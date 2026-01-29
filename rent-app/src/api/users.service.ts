// src/api/users.service.ts
import { api } from './api';
import type { User } from '../types';

export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>('/users');
  return response.data;
}

export async function updateUser(
  userId: string,
  data: Partial<User>
): Promise<User> {
  const response = await api.patch(`/users/${userId}`, data);
  return response.data;
}
