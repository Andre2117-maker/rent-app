export type ReservationStatus = 'ACTIVE' | 'FINISHED' | 'CANCELED';

export interface ReservationMock {
  id: string;
  status: ReservationStatus;
  startTime: string;
  endTime: string;
  equipment: {
    name: string;
  };
}

export const reservationsMock: ReservationMock[] = [
  {
    id: '1',
    status: 'ACTIVE',
    startTime: '2026-01-07T10:00:00Z',
    endTime: '2026-01-07T12:00:00Z',
    equipment: {
      name: 'Martelo Pneumático',
    },
  },
  {
    id: '2',
    status: 'FINISHED',
    startTime: '2026-01-05T08:00:00Z',
    endTime: '2026-01-05T09:00:00Z',
    equipment: {
      name: 'Fita Métrica',
    },
  },
  {
    id: '3',
    status: 'CANCELED',
    startTime: '2026-01-06T14:00:00Z',
    endTime: '2026-01-06T15:00:00Z',
    equipment: {
      name: 'Nível a Laser',
    },
  },
];
