import { api } from './api';
import type { LoginResponse } from '../types';
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
}

export async function register(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<void> {
  await api.post('/auth/register', data);
}

export async function getProfile() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado');
  }

  const response = await api.get('/auth/me', {
    params: {
      token: token,
    },
  });

  return response.data;
}
