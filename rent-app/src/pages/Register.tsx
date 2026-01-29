import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Link,
  CircularProgress,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { register } from '../api/auth.service';

// Interface para o erro do backend
interface BackendError {
  message?: string;
  detail?: string | Array<{ msg: string }>;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate('/login', { state: { message: 'Conta criada com sucesso!' } });
    } catch (err) {
      let message = 'Erro ao registrar usuário.';

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<BackendError>;
        const detail = axiosError.response?.data?.detail;

        if (typeof detail === 'string') {
          message = detail;
        } else if (Array.isArray(detail)) {
          message = detail[0].msg;
        } else if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        }
      }

      setError(message);
      console.error('Detalhes do erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="800"
            color="primary"
            gutterBottom
          >
            CRIAR CONTA
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Preencha os campos abaixo para acessar o sistema
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                name="name"
                label="Nome Completo"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                name="username"
                label="Nome de Usuário"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                name="email"
                label="E-mail"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                name="password"
                label="Senha"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'FINALIZAR CADASTRO'
                )}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Já tem uma conta?{' '}
            <Link
              component={RouterLink}
              to="/login"
              fontWeight="bold"
              underline="hover"
            >
              Entrar agora
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
