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

export async function getProfile() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado');
  }

  const response = await api.get('/auth/me', {
    params: {
      token,
    },
  });

  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}
