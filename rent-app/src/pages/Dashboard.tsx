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

  // Função para criar reserva com try/catch para evitar crash
  async function submitReservation(startTime: string, endTime: string) {
    try {
      const userId = localStorage.getItem('userId');

      // Encontramos o objeto completo do equipamento selecionado para pegar o nome
      const selectedEquipment = equipments.find(
        (e) => e.id === selectedEquipmentId
      );

      if (!userId || !selectedEquipment) {
        alert('Usuário ou Equipamento não identificado.');
        return;
      }

      // CHAMADA AO MOCK: Passamos os dados necessários para o localStorage
      await createReservation({
        equipmentId: selectedEquipment.id,
        equipmentName: selectedEquipment.name, // O mock precisa disso para listar depois
        startTime: startTime,
        endTime: endTime,
      });

      // Atualização Visual: Muda o status para 'Occupied' na tela na hora
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

  // Busca de equipamentos com blindagem contra objetos no estado de erro
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

          // Se o backend mandou o array de erro do Pydantic {type, loc, msg...}
          if (Array.isArray(detail)) {
            message = detail[0]?.msg || message;
          }
          // Se o backend mandou apenas uma string
          else if (typeof detail === 'string') {
            message = detail;
          }
        }

        setError(message); // Agora garantimos que 'message' é uma string
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
          {/* LOADING STATE */}
          {loading &&
            skeletons.map((_, index) => (
              // Removido a prop 'item'. No MUI v6+, Grid herda as propriedades de tamanho diretamente.
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

          {/* LISTA DE EQUIPAMENTOS REAL */}
          {!loading &&
            !error &&
            equipments.map((equipment) => (
              // Se estiver usando MUI v6, usamos a prop 'size' em vez de xs, sm, md isolados
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
