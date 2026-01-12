import { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { sendCommand } from '../api/commands.service';

export function Commands() {
  const [equipmentId, setEquipmentId] = useState('');
  const [commandTypeId, setCommandTypeId] = useState('');
  const [payload, setPayload] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = async () => {
    try {
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
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Enviar comando para equipamento
      </Typography>

      {/* EQUIPAMENTO */}
      <TextField
        fullWidth
        label="Equipment ID"
        value={equipmentId}
        onChange={(e) => setEquipmentId(e.target.value)}
        margin="normal"
      />

      {/* COMANDO */}
      <TextField
        select
        fullWidth
        label="Comando"
        value={commandTypeId}
        onChange={(e) => setCommandTypeId(e.target.value)}
        margin="normal"
      >
        <MenuItem value="cmd-ligar">Ligar</MenuItem>
        <MenuItem value="cmd-desligar">Desligar</MenuItem>
        <MenuItem value="cmd-reiniciar">Reiniciar</MenuItem>
      </TextField>

      {/* PAYLOAD OPCIONAL */}
      <TextField
        fullWidth
        label="Payload (opcional)"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSend}
        disabled={!equipmentId || !commandTypeId}
      >
        Enviar comando
      </Button>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Comando enviado com sucesso
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Erro ao enviar comando
        </Alert>
      )}
    </Box>
  );
}
