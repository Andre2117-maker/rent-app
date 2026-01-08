import { equipmentsMock } from '../mocks/equipment.mock';

export async function getEquipments() {
  // simula delay da API
  await new Promise((resolve) => setTimeout(resolve, 500));

  return equipmentsMock;
}
