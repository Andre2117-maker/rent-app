import { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import type { AxiosError } from 'axios';
import { AuthContext } from '../components/AuthContext';
import { login as loginService, getProfile } from '../api/auth.service';
import { useNavigate } from 'react-router-dom';

interface LoginError {
  detail?: string;
}

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { saveToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin() {
    setError('');

    try {
      // 🔐 Login
      const data = await loginService(username, password);

      const token = data.accessToken;

      if (!token) {
        console.error('Resposta do login:', data);
        throw new Error('Token não retornado pelo backend');
      }

      // 💾 Salva token
      localStorage.setItem('token', token);
      saveToken(token);

      // 👤 (Opcional) buscar perfil
      const me = await getProfile();

      localStorage.setItem('user', JSON.stringify(me));
      localStorage.setItem('userId', me.id);

      // 🚀 Redireciona
      navigate('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<LoginError>;

      setError(
        axiosError.response?.data?.detail ||
          axiosError.message ||
          'Usuário ou senha inválidos'
      );
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
