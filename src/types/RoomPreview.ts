import Message from "./Message";
import Room from "./Room";

type RoomPreview = Room & {
  last_message: Message;
};

export default RoomPreview;
