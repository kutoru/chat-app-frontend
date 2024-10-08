type PendingMessage = {
  temp_id: number;
  room_id: number;
  text: string;
  files: File[];
};

export default PendingMessage;
