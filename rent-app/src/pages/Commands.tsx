import { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Paper,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendCommand } from '../api/commands.service';

export function Commands() {
  const navigate = useNavigate();

  const [equipmentId, setEquipmentId] = useState('');
  const [commandTypeId, setCommandTypeId] = useState('');
  const [payload, setPayload] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const COMMANDS = [
    { id: 'cmd-ligar', label: 'Ligar' },
    { id: 'cmd-desligar', label: 'Desligar' },
    { id: 'cmd-reiniciar', label: 'Reiniciar' },
  ];

  const handleSend = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(false);

      await sendCommand({
        equipmentId,
        commandTypeId,
        payload,
      });

      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      {/* TÍTULO */}
      <Typography variant="h4" mb={1}>
        Comandos
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        Enviar comandos para equipamentos
      </Typography>

      {/* BOTÃO VOLTAR */}
      <Button
        variant="text"
        sx={{ mb: 3 }}
        onClick={() => navigate('/dashboard')}
      >
        ← Voltar para o menu
      </Button>

      {/* CARD */}
      <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Equipment ID"
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Comando"
            value={commandTypeId}
            onChange={(e) => setCommandTypeId(e.target.value)}
          >
            {COMMANDS.map((cmd) => (
              <MenuItem key={cmd.id} value={cmd.id}>
                {cmd.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Payload (opcional)"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!equipmentId || !commandTypeId || loading}
          >
            {loading ? 'Enviando...' : 'Enviar comando'}
          </Button>

          {success && (
            <Alert severity="success">Comando enviado com sucesso</Alert>
          )}

          {error && <Alert severity="error">Erro ao enviar comando</Alert>}
        </Stack>
      </Paper>
    </Box>
  );
}
