import { Box, Typography, Card, CardContent, Chip, Grid } from '@mui/material';
import { Header } from '../components/Header';
import {
  reservationsMock,
  type ReservationMock as Reservation,
  type ReservationStatus,
} from '../mocks/reservation.mock';

export function Reservations() {
  const reservations: Reservation[] = reservationsMock;

  const activeReservations = reservations.filter((r) => r.status === 'ACTIVE');

  const finishedReservations = reservations.filter(
    (r) => r.status !== 'ACTIVE'
  );

  function renderStatusChip(status: ReservationStatus) {
    switch (status) {
      case 'ACTIVE':
        return <Chip label="Ativa" color="success" />;
      case 'FINISHED':
        return <Chip label="Encerrada" color="default" />;
      case 'CANCELED':
        return <Chip label="Cancelada" color="error" />;
      default:
        return null;
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR');
  }

  function ReservationCard({ reservation }: { reservation: Reservation }) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{reservation.equipment.name}</Typography>

          <Box mt={1} mb={1}>
            {renderStatusChip(reservation.status)}
          </Box>

          <Typography variant="body2">
            Início: {formatDate(reservation.startTime)}
          </Typography>

          <Typography variant="body2">
            Fim: {formatDate(reservation.endTime)}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Header />

      <Box p={4}>
        <Typography variant="h4" mb={3}>
          Minhas Reservas
        </Typography>

        {/* RESERVAS ATIVAS */}
        <Typography variant="h5" mb={2}>
          Reservas Ativas
        </Typography>

        <Grid container spacing={3} mb={4}>
          {activeReservations.length === 0 && (
            <Typography>Nenhuma reserva ativa.</Typography>
          )}

          {activeReservations.map((reservation) => (
            // @ts-expect-error MUI Grid typing
            <Grid item xs={12} md={6} lg={4} key={reservation.id}>
              <ReservationCard reservation={reservation} />
            </Grid>
          ))}
        </Grid>

        {/* RESERVAS ENCERRADAS */}
        <Typography variant="h5" mb={2}>
          Reservas Encerradas
        </Typography>

        <Grid container spacing={3}>
          {finishedReservations.length === 0 && (
            <Typography>Nenhuma reserva encerrada.</Typography>
          )}

          {finishedReservations.map((reservation) => (
            // @ts-expect-error MUI Grid typing
            <Grid item xs={12} md={6} lg={4} key={reservation.id}>
              <ReservationCard reservation={reservation} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
