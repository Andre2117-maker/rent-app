// import { equipmentsMock } from '../mocks/equipment.mock';

// export async function getEquipments() {
//   // simula delay da API
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   return equipmentsMock;
// }
import { api } from './api';

export async function getEquipments() {
  const response = await api.get('/equipments');
  return response.data;
}
