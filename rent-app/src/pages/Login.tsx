import { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import type { AxiosError } from 'axios';

import { api } from '../api/api';
import { AuthContext } from '../components/AuthContext';

type LoginResponse = {
  accessToken: string;
  tokenType: string;
};

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { saveToken } = useContext(AuthContext);

  async function handleLogin() {
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post<LoginResponse>('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      saveToken(response.data.accessToken);
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;

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
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        disabled={!username || !password}
      >
        Entrar
      </Button>
    </Box>
  );
}
