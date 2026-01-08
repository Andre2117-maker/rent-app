interface CreateReservationDTO {
  equipmentId: string;
  startTime: string;
  endTime: string;
}

export async function createReservation(data: CreateReservationDTO) {
  console.log('Reserva mockada:', data);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: Math.random().toString(),
    status: 'success',
  };
}
