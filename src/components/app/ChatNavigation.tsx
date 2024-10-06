import AddIcon from "../../assets/add.svg?react";
import ChatCard from "./ChatCard";

type Props = {
  headerHeight: number;
  setExpanded: (v: boolean) => void;
  onAddClick: () => void;
};

export default function ChatNavigation({
  headerHeight,
  setExpanded,
  onAddClick,
}: Props) {
  function loadNavigationCards() {
    const cards = [];
    for (let i = 0; i < 16; i++) {
      cards.push(<ChatCard onClick={() => setExpanded(true)} />);
    }
    return cards;
  }

  return (
    <div className="relative bg-dark-2 h-fit flex-1 md:w-96 md:flex-none">
      <div
        className="flex flex-col overflow-y-auto pb-[4.25rem] scrollbar "
        style={{ height: `calc(100dvh - ${headerHeight}px)` }}
      >
        {loadNavigationCards()}
      </div>

      <button
        onClick={onAddClick}
        className={
          "group/btn absolute me-3 mb-3 right-0 bottom-0 rounded-full size-11 bg-rose-600 p-2 shadow-md transition-all " +
          "hover:bg-rose-700 active:bg-rose-800"
        }
      >
        <AddIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
      </button>
    </div>
  );
}
