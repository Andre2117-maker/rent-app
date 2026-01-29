import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Alert,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createEquipment } from '../api/equipment.service';
import type { CreateEquipmentDTO } from '../api/equipment.service';
import { Header } from '../components/Header';
import axios, { AxiosError } from 'axios';

// Interface para o erro do FastAPI
interface BackendError {
  detail: string | Array<{ msg: string }>;
}

const STATUS_OPTIONS = [
  { id: 'dd2440d9-73c3-42c0-93b9-6a918ddf7ac1', name: 'Available' },
  { id: 'f8bbaae7-5794-4071-9af2-d72ccdc16d63', name: 'Maintenance' },
  { id: '96e6992c-b1d6-44a7-82c4-bccf1cac9dc0', name: 'Offline' },
  { id: '4e06d5b3-e2d6-407c-aac5-1478ef288b4e', name: 'Occupied' },
];

export function NewEquipment() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>(
    '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  );
  const [statusId, setStatusId] = useState<string>(
    'dd2440d9-73c3-42c0-93b9-6a918ddf7ac1'
  );

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const payload: CreateEquipmentDTO = {
      name,
      description,
      location,
      currentStatusId: statusId,
    };

    try {
      await createEquipment(payload);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<BackendError>;
        const detail = axiosError.response?.data?.detail;

        if (Array.isArray(detail)) {
          setError(detail[0].msg);
        } else if (typeof detail === 'string') {
          setError(detail);
        } else {
          setError('Erro ao conectar com o servidor.');
        }
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box mt={4}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" mb={3} fontWeight="bold">
              Novo Equipamento
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Criado com sucesso!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nome do Equipamento"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
              />

              <TextField
                select
                fullWidth
                label="Status Inicial"
                value={statusId}
                onChange={(e) => setStatusId(e.target.value)}
                margin="normal"
                required
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="UUID da Localização"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                margin="normal"
                required
                helperText="ID de localização existente no banco."
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
              >
                CADASTRAR EQUIPAMENTO
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
