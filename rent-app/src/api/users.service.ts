import { api } from './api';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
}

export async function getUsers(): Promise<SystemUser[]> {
  const response = await api.get<SystemUser[]>('/users');
  return response.data;
}
