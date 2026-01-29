import { useEffect, useState } from 'react';
import type { ReservationMock } from '../mocks/reservation.mock';
import { getReservations } from '../api/reservation.service';
import { Box, Typography, Paper, Chip, Container, Stack } from '@mui/material';
import { Header } from '../components/Header';

export function Reservations() {
  const [list, setList] = useState<ReservationMock[]>([]);

  useEffect(() => {
    getReservations().then((data) => setList(data));
  }, []);

  const getStatusColor = (
    status: string
  ): 'success' | 'error' | 'default' | 'warning' => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'CANCELED':
        return 'error';
      case 'FINISHED':
        return 'default';
      default:
        return 'warning';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="800" mb={4} color="#1a1a1a">
          Minhas Reservas
        </Typography>

        <Stack spacing={2.5}>
          {list.length > 0 ? (
            list.map((res) => (
              <Paper
                key={res.id}
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  borderLeft: `6px solid ${
                    res.status === 'ACTIVE'
                      ? '#2e7d32'
                      : res.status === 'CANCELED'
                        ? '#d32f2f'
                        : '#757575'
                  }`,
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#333">
                    {res.equipment.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 0.5 }}
                  >
                    🗓️ {new Date(res.startTime).toLocaleDateString()} | 🕒{' '}
                    {new Date(res.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    às{' '}
                    {new Date(res.endTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>

                <Chip
                  label={res.status}
                  color={getStatusColor(res.status)}
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    minWidth: '100px',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                />
              </Paper>
            ))
          ) : (
            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 2 }}>
              <Typography color="textSecondary" variant="h6">
                Nenhuma reserva encontrada.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Vá ao Dashboard para reservar um equipamento.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
