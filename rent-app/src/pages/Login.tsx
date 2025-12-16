import { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { api } from '../api/api';
import { AuthContext } from '../components/AuthContext';
import type { AxiosError } from 'axios';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { saveToken } = useContext(AuthContext);

  async function handleLogin() {
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // backend espera "username"
      formData.append('password', password);

      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token } = response.data;

      saveToken(access_token);
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;

      console.error(error.response?.data);
      setError(error.response?.data?.detail || 'Usuário ou senha inválidos');
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      margin="auto"
      marginTop={10}
    >
      <Typography variant="h5">Login</Typography>

      <TextField
        label="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={!email || !password}
      >
        Entrar
      </Button>
    </Box>
  );
}
