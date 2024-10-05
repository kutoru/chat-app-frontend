import SettingsIcon from "../../assets/settings.svg?react";
import AddIcon from "../../assets/add.svg?react";
import NavigationCard from "./NavigationCard";

export default function ChatNavigation() {
  function loadNavigationCards() {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push(<NavigationCard />);
    }
    return cards;
  }

  return (
    <div className="bg-dark-2 h-dvh md:w-96">
      <div className="bg-dark-3 h-12 p-1 shadow-md border-rose-600 border-b-2 w-full md:h-14 md:p-2">
        <button
          className={
            "group/btn size-10 p-1 transition-all rounded-md " +
            "hover:bg-[#00000020] active:bg-[#00000030]"
          }
        >
          <SettingsIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>
      </div>

      <div className="relative">
        <div className="flex flex-col h-[calc(100dvh-3rem)] overflow-y-auto pb-14 md:h-[calc(100dvh-3.5rem)] md:pb-[4.25rem] scrollbar">
          {loadNavigationCards()}
        </div>

        <button
          className={
            "group/btn absolute me-2 mb-2 right-0 bottom-0 rounded-full size-10 bg-rose-600 p-2 shadow-md transition-all md:size-11 md:me-3 md:mb-3 " +
            "hover:bg-rose-700 active:bg-rose-800"
          }
        >
          <AddIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>
      </div>
    </div>
  );
}
