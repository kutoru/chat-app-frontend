import DefaultPfpIcon from "../../../assets/default-pfp.svg?react";
import global from "../../../global";
import RoomPreview from "../../../types/RoomPreview";
import { formatDate } from "../../../utils";

type Props = {
  onClick: () => void;
  room: RoomPreview;
};

export default function ChatCard({ onClick, room }: Props) {
  return (
    <div
      onClick={onClick}
      className="border-b-2 border-dark-1 p-2 flex gap-2 cursor-pointer hover:bg-dark-1.5 active:bg-dark-1 select-none md:p-3 md:gap-3"
    >
      <div
        className={
          "border-2 border-neutral-400 rounded-full size-12 flex-none" +
          (!room.cover_image ? " p-1.5" : "")
        }
      >
        {!room.cover_image ? (
          <DefaultPfpIcon className="fill-neutral-400" />
        ) : (
          <img
            className="rounded-full object-cover"
            src={global.API_URL + "/files/" + room.cover_image}
          />
        )}
      </div>

      <div className="flex-1 flex">
        <div className="my-auto w-full">
          <div className="flex">
            <div className="text-ellipsis overflow-hidden max-w-48">
              {room.type === "direct" && "@"}
              {room.name}
            </div>

            <div className="flex-1" />

            <div className="text-neutral-400 text-sm">
              {formatDate(room.message_created)}
            </div>
          </div>

          <div className="line-clamp-1 text-neutral-300">
            {room.message_text}
          </div>
        </div>
      </div>
    </div>
  );
}
