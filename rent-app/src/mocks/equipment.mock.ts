export type EquipmentStatus =
  | 'Available'
  | 'Occupied'
  | 'Maintenance'
  | 'Offline';

export interface Equipment {
  id: string;
  name: string;
  description?: string;
  currentStatusName: EquipmentStatus;
}

export const equipmentsMock: Equipment[] = [
  {
    id: '1',
    name: 'Furadeira',
    description: 'Furadeira elétrica 500W',
    currentStatusName: 'Available',
  },
  {
    id: '2',
    name: 'Serra Circular',
    description: 'Serra de bancada',
    currentStatusName: 'Maintenance',
  },
  {
    id: '3',
    name: 'Parafusadeira',
    description: 'Bateria 18V',
    currentStatusName: 'Occupied',
  },
  {
    id: '4',
    name: 'Britadeira',
    description: 'Britadeira elétrica 1500W',
    currentStatusName: 'Available',
  },
];
