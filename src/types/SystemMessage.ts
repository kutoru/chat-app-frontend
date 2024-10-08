type SystemMessage = {
  id?: number;
  room_id?: number;
  isError?: boolean;
  text: string;
  created?: number;
};

export default SystemMessage;
