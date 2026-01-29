import { useEffect, useState } from 'react';
import { Box, Typography, Alert, Grid, Skeleton } from '@mui/material';
import axios, { AxiosError } from 'axios';

import { Header } from '../components/Header';
import { EquipmentCard } from '../components/EquipmentCard';
import { ReservationModal } from '../components/ReservationModal';

import { getEquipments } from '../api/equipment.service';
import { createReservation } from '../api/reservation.service';

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
    try {
      const userId = localStorage.getItem('userId');

      const selectedEquipment = equipments.find(
        (e) => e.id === selectedEquipmentId
      );

      if (!userId || !selectedEquipment) {
        alert('Usuário ou Equipamento não identificado.');
        return;
      }

      await createReservation({
        equipmentId: selectedEquipment.id,
        equipmentName: selectedEquipment.name,
        startTime: startTime,
        endTime: endTime,
      });

      setEquipments((prev) =>
        prev.map((eq) =>
          eq.id === selectedEquipmentId
            ? { ...eq, currentStatusName: 'Occupied' }
            : eq
        )
      );

      setModalOpen(false);
      alert(
        `Reserva de "${selectedEquipment.name}" realizada com sucesso! (Modo Simulação)`
      );
    } catch (err) {
      console.error('Erro ao reservar:', err);
      alert('Erro ao realizar reserva simulada.');
    }
  }

  useEffect(() => {
    async function fetchEquipments() {
      try {
        setLoading(true);
        setError(null);

        const data = await getEquipments();
        setEquipments(data);
      } catch (err) {
        let message = 'Erro ao carregar equipamentos';

        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<ApiErrorResponse>;
          const detail = axiosError.response?.data?.detail;

          if (Array.isArray(detail)) {
            message = detail[0]?.msg || message;
          } else if (typeof detail === 'string') {
            message = detail;
          }
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipments();
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <>
      <Header />

      <Box p={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">Equipamentos</Typography>
        </Box>

        {error && (
          <Box mb={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        <Grid container spacing={3}>
          {loading &&
            skeletons.map((_, index) => (
              <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box>
                  <Skeleton
                    variant="rectangular"
                    height={120}
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton width="60%" sx={{ mt: 1 }} />
                  <Skeleton width="40%" />
                </Box>
              </Grid>
            ))}

          {!loading &&
            !error &&
            equipments.map((equipment) => (
              <Grid key={equipment.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid>
      </Box>

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
