import React, { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getProfile } from '../api/auth.service';
import { updateUser } from '../api/users.service';
import { Header } from '../components/Header';

// Interfaces estritas para evitar any/unknown
interface UserData {
  id: string;
  name: string;
  email: string;
  username?: string;
}

interface BackendError {
  message?: string;
  detail?: string | Array<{ msg: string }>;
}

export const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState({
    text: '',
    type: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await getProfile();
      setUser(data);
      setEditForm({ name: data.name, email: data.email });
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Erro ao carregar dados do perfil.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setMessage({ text: '', type: 'success' });

    try {
      await updateUser(user.id, {
        name: editForm.name,
        email: editForm.email,
      });

      setMessage({ text: 'Perfil atualizado com sucesso!', type: 'success' });
      setIsEditing(false);
      await loadUserData();
    } catch (err) {
      let errorMsg = 'Erro ao atualizar perfil.';

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<BackendError>;
        const detail = axiosError.response?.data?.detail;

        if (typeof detail === 'string') {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail[0].msg;
        } else if (axiosError.response?.data?.message) {
          errorMsg = axiosError.response.data.message;
        }
      }

      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#f0f2f5',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: '#1976d2',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Typography variant="h4" fontWeight="800" color="#1a1a1a">
              Meu Perfil
            </Typography>
          </Stack>

          {message.text && (
            <Alert
              severity={message.type}
              sx={{ mb: 3 }}
              onClose={() => setMessage({ text: '', type: 'success' })}
            >
              {message.text}
            </Alert>
          )}

          {!isEditing ? (
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="overline"
                  color="primary"
                  fontWeight="bold"
                >
                  ID Único
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'monospace',
                    bgcolor: '#f5f5f5',
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {user?.id}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="overline"
                  color="primary"
                  fontWeight="bold"
                >
                  Nome Completo
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {user?.name}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="overline"
                  color="primary"
                  fontWeight="bold"
                >
                  E-mail
                </Typography>
                <Typography variant="body1" fontWeight="500">
                  {user?.email}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={() => setIsEditing(true)}
                sx={{ py: 1.5, mt: 2, fontWeight: 'bold', borderRadius: 2 }}
              >
                Editar Informações
              </Button>
            </Stack>
          ) : (
            <Box component="form" onSubmit={handleUpdate}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  required
                />

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={submitting}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {submitting ? 'Salvando...' : 'Salvar'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    onClick={() => setIsEditing(false)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
