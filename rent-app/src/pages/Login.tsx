import { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import type { AxiosError } from 'axios';

import { AuthContext } from '../components/AuthContext';
import { login as loginService } from '../api/auth.service';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { saveToken } = useContext(AuthContext);

  async function handleLogin() {
    setError('');
    try {
      const formdata = new URLSearchParams();
      formdata.append('username', username);
      formdata.append('password', password);

      const data = await loginService(username, password);
      saveToken(data.accessToken);
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;

      setError(error.response?.data.detail || 'Usuários ou senha Inválidos');
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
