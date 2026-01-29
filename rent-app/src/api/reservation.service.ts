import { reservationsMock } from '../mocks/reservation.mock';
import type { ReservationMock } from '../mocks/reservation.mock';

const LOCAL_STORAGE_KEY = 'app_reservations_db';

const getStoredReservations = (): ReservationMock[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservationsMock));
    return reservationsMock;
  }
  return JSON.parse(stored);
};

export async function getReservations(): Promise<ReservationMock[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getStoredReservations();
}

export async function createReservation(data: {
  equipmentId: string;
  equipmentName: string;
  startTime: string;
  endTime: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newReservation: ReservationMock = {
    id: crypto.randomUUID(),
    status: 'ACTIVE',
    startTime: data.startTime,
    endTime: data.endTime,
    equipment: {
      name: data.equipmentName,
    },
  };

  const current = getStoredReservations();
  const updated = [newReservation, ...current];

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

  return newReservation;
}
