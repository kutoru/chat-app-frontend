import AddIcon from "../../../assets/add.svg?react";
import SpinnerIcon from "../../../assets/spinner.svg?react";
import ConnectionState from "../../../types/ConnectionState";
import RoomPreview from "../../../types/RoomPreview";
import ChatCard from "./ChatCard";

type Props = {
  headerHeight: number;
  connState: ConnectionState;
  setExpanded: (v: boolean) => void;
  openRoom: (r: RoomPreview) => void;
  onAddClick: () => void;
  rooms: RoomPreview[];
};

export default function ChatNavigation({
  headerHeight,
  connState,
  setExpanded,
  openRoom,
  onAddClick,
  rooms,
}: Props) {
  function loadNavigationCards() {
    const cards = [];

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];

      cards.push(
        <ChatCard
          key={room.id}
          room={room}
          onClick={() => {
            openRoom(room);
            setExpanded(true);
          }}
        />,
      );
    }

    return cards;
  }

  return (
    <div className="relative bg-dark-2 h-fit flex-1 md:w-96 md:flex-none md:shadow-md">
      {connState === ConnectionState.Connected && rooms.length > 0 ? (
        <div
          className="flex flex-col overflow-y-auto pb-[4.25rem] scrollbar "
          style={{ height: `calc(100dvh - ${headerHeight}px)` }}
        >
          {loadNavigationCards()}
        </div>
      ) : (
        <div
          className="text-xl text-center px-4 py-8 text-neutral-400"
          style={{ height: `calc(100dvh - ${headerHeight}px)` }}
        >
          {connState === ConnectionState.Connected &&
            "It seems that you don't have any chats yet. Create a new one by tapping on the + button below"}
          {connState === ConnectionState.Disconnected && "Disconnected"}
          {connState === ConnectionState.Loading && <SpinnerIcon />}
        </div>
      )}

      <button
        onClick={onAddClick}
        disabled={connState !== ConnectionState.Connected}
        className={
          "group/btn absolute me-3 mb-3 right-0 bottom-0 rounded-full size-11 bg-rose-600 p-2 shadow-md transition-all " +
          "hover:bg-rose-700 active:bg-rose-800 disabled:bg-gray-500"
        }
      >
        <AddIcon
          className={
            "size-full transition-all" +
            " group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400 group-disabled/btn:fill-neutral-300"
          }
        />
      </button>
    </div>
  );
}
