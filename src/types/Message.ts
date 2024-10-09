import FileInfo from "./FileInfo";

type Message = {
  id: number;
  room_id: number;
  temp_id?: number;
  profile_image?: string;
  username?: string;
  from_self: boolean;
  text: string;
  created: number;
  files?: FileInfo[];
};

export default Message;
