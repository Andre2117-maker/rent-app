import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Paper,
  Stack,
  Container,
  Grid as Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendCommand } from '../api/commands.service';
import { Header } from '../components/Header';

interface LogEntry {
  id: string;
  time: string;
  text: string;
  type: 'info' | 'success' | 'error';
}

export function Commands() {
  const navigate = useNavigate();

  const [equipmentId, setEquipmentId] = useState<string>('');
  const [commandTypeId, setCommandTypeId] = useState<string>('');
  const [payload, setPayload] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      time: new Date().toLocaleTimeString(),
      text: 'Sistema de comandos pronto.',
      type: 'info',
    },
  ]);

  const COMMANDS = [
    { id: 'cmd-ligar', label: 'Ligar (START)' },
    { id: 'cmd-desligar', label: 'Desligar (STOP)' },
    { id: 'cmd-reiniciar', label: 'Reiniciar (REBOOT)' },
  ];

  const addLog = (text: string, type: 'info' | 'success' | 'error'): void => {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      time: new Date().toLocaleTimeString(),
      text,
      type,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 10));
  };

  const handleSend = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      // throw new Error('Teste de erro');

      setLoading(true);
      setSuccess(false);
      setError(false);

      await sendCommand({
        equipmentId,
        commandTypeId,
        payload,
      });

      setSuccess(true);
      addLog(
        `Comando [${commandTypeId}] enviado com sucesso para ${equipmentId}`,
        'success'
      );
      setPayload('');
    } catch {
      setError(true);
      addLog(`Falha crítica ao enviar comando para ${equipmentId}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="h4" fontWeight="800" color="#1a1a1a">
              Painel de Comandos
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Controle de dispositivos via MQTT Protocol
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{ borderRadius: 2 }}
          >
            Voltar ao Dashboard
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* COLUNA DO FORMULÁRIO */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Executar Instrução
              </Typography>

              <Box component="form" onSubmit={handleSend}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="ID do Equipamento"
                    placeholder="UUID do equipamento"
                    value={equipmentId}
                    onChange={(e) => setEquipmentId(e.target.value)}
                    required
                  />

                  <TextField
                    select
                    fullWidth
                    label="Comando"
                    value={commandTypeId}
                    onChange={(e) => setCommandTypeId(e.target.value)}
                    required
                  >
                    {COMMANDS.map((cmd) => (
                      <MenuItem key={cmd.id} value={cmd.id}>
                        {cmd.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Dados do Payload (JSON)"
                    placeholder='{"power": "high"}'
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    multiline
                    rows={2}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!equipmentId || !commandTypeId || loading}
                    sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                  >
                    {loading ? 'Transmitindo...' : 'Enviar para o Broker'}
                  </Button>

                  {success && (
                    <Alert severity="success" variant="filled">
                      Mensagem publicada!
                    </Alert>
                  )}
                  {error && (
                    <Alert severity="error" variant="filled">
                      Erro de conexão MQTT.
                    </Alert>
                  )}
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* COLUNA DO CONSOLE */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor: '#1a1a1a',
                color: '#fff',
                overflow: 'hidden',
                border: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  bgcolor: '#2d2d2d',
                  p: 1.5,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#ff5f56',
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#ffbd2e',
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#27c93f',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    ml: 2,
                    color: '#888',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                  }}
                >
                  mqtt_monitor_session
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 3,
                  height: 400,
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                }}
              >
                {logs.map((log) => (
                  <Box key={log.id} sx={{ mb: 1, display: 'flex', gap: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: '#555', minWidth: '75px' }}
                    >
                      [{log.time}]
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          log.type === 'success'
                            ? '#4af626'
                            : log.type === 'error'
                              ? '#ff5f56'
                              : '#00bfff',
                        wordBreak: 'break-all',
                        fontWeight: log.type !== 'info' ? 'bold' : 'normal',
                      }}
                    >
                      {log.type === 'info'
                        ? '>>'
                        : log.type === 'success'
                          ? '[SUCCESS]'
                          : '[FAILURE]'}{' '}
                      {log.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
