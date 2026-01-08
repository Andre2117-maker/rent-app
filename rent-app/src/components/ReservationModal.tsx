import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  equipmentId: string;
  onSubmit: (startTime: string, endTime: string) => Promise<void>;
}

export function ReservationModal({ open, onClose, onSubmit }: Props) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError('');

    if (!startTime || !endTime) {
      setError('Preencha todas as datas');
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      setError('Data final deve ser maior que a inicial');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(startTime, endTime);
      onClose();
    } catch {
      setError('Erro ao criar reserva');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Reservar equipamento</DialogTitle>

      <DialogContent>
        <TextField
          label="Início"
          type="datetime-local"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <TextField
          label="Fim"
          type="datetime-local"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
