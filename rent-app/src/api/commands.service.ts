export type SendCommandDto = {
  equipmentId: string;
  commandTypeId: string;
  payload?: string;
};

export const sendCommand = async (data: SendCommandDto) => {
  console.log('Mock sendCommand:', data);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};
