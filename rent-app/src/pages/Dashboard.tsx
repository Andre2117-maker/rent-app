import { useEffect, useState } from 'react';
import { Box, Typography, Alert, Grid, Skeleton } from '@mui/material';
import type { AxiosError } from 'axios';

import { Header } from '../components/Header';
import { EquipmentCard } from '../components/EquipmentCard';
import { ReservationModal } from '../components/ReservationModal';

import { getEquipments } from '../api/equipment.service';
import { createReservation } from '../api/reservation.service';
import { Link } from 'react-router-dom';

interface ApiErrorDetail {
  type: string;
  loc: string[];
  msg: string;
  input: unknown;
  url?: string;
}

interface ApiErrorResponse {
  detail?: string | ApiErrorDetail[];
}

interface Equipment {
  id: string;
  name: string;
  description?: string;
  currentStatusName: 'Available' | 'Occupied' | 'Maintenance' | 'Offline';
}

export function Dashboard() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  async function submitReservation(startTime: string, endTime: string) {
    const userId = localStorage.getItem('userId');

    if (!userId || !selectedEquipmentId) {
      throw new Error('Usuário ou equipamento inválido');
    }

    await createReservation({
      equipmentId: selectedEquipmentId,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    });

    // Atualiza status do equipamento após sucesso
    setEquipments((prev) =>
      prev.map((eq) =>
        eq.id === selectedEquipmentId
          ? { ...eq, currentStatusName: 'Occupied' }
          : eq
      )
    );
  }

  useEffect(() => {
    async function fetchEquipments() {
      try {
        setLoading(true);
        setError(null);

        const data = await getEquipments();
        setEquipments(data);
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;

        let message = 'Erro ao carregar equipamentos';

        if (Array.isArray(error.response?.data?.detail)) {
          message = error.response.data.detail[0].msg;
        } else if (typeof error.response?.data?.detail === 'string') {
          message = error.response.data.detail;
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipments();
  }, []);

  const skeletons = Array.from({ length: 6 });

  if (error) {
    return (
      <>
        <Header />
        <Box mt={5} px={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />

      <Box p={4}>
        <Typography variant="h4" mb={3}>
          Equipamentos
        </Typography>

        <Box mb={3}>
          <Link to="/commands" style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Enviar comandos
            </Typography>
          </Link>
        </Box>

        <Grid container spacing={3}>
          {/* LOADING */}
          {loading &&
            skeletons.map((_, index) => (
              // @ts-expect-error MUI Grid typing issue
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <Box>
                  <Skeleton variant="rectangular" height={120} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              </Grid>
            ))}

          {/* LISTA DE EQUIPAMENTOS */}
          {!loading &&
            equipments.map((equipment) => (
              // @ts-expect-error MUI Grid typing issue
              <Grid item xs={12} sm={6} md={4} key={equipment.id}>
                <EquipmentCard
                  name={equipment.name}
                  description={equipment.description}
                  status={equipment.currentStatusName}
                  onReserve={() => {
                    setSelectedEquipmentId(equipment.id);
                    setModalOpen(true);
                  }}
                />
              </Grid>
            ))}

          {!loading && equipments.length === 0 && (
            <Box mt={4}>
              <Typography>Nenhum equipamento disponível.</Typography>
            </Box>
          )}
        </Grid>
      </Box>

      {/* MODAL DE RESERVA */}
      {selectedEquipmentId && (
        <ReservationModal
          open={modalOpen}
          equipmentId={selectedEquipmentId}
          onClose={() => setModalOpen(false)}
          onSubmit={submitReservation}
        />
      )}
    </>
  );
}
