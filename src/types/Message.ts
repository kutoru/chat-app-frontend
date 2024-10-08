import File from "./File";

type Message = {
  id: number;
  room_id: number;
  profile_image?: string;
  username?: string;
  from_self: boolean;
  text: string;
  created: number;
  files?: File[];
};

export default Message;
