import { api } from './api';

export async function login(username: string, password: string) {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
}

export async function register(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export async function getProfile() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado');
  }

  const response = await api.get('/auth/me', {
    params: { token },
  });

  return response.data;
}
