import SettingsIcon from "../../assets/settings.svg?react";
import BackIcon from "../../assets/back.svg?react";
import { useEffect, useRef } from "react";
import RoomPreview from "../../types/RoomPreview";
import global from "../../global";
import DefaultPfpIcon from "../../assets/default-pfp.svg?react";

type Props = {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  headerHeight: number;
  setHeaderHeight: (v: number) => void;
  onSettingsClick: () => void;
  currRoom: RoomPreview | undefined;
};

export default function ChatHeader({
  expanded,
  setExpanded,
  headerHeight,
  setHeaderHeight,
  onSettingsClick,
  currRoom,
}: Props) {
  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [headerHeight, setHeaderHeight]);

  useEffect(() => {
    onResize();
  }, [header]);

  function onResize() {
    const currHeight = header.current?.getBoundingClientRect().height;
    if (currHeight && currHeight !== headerHeight) {
      setHeaderHeight(currHeight);
    }
  }

  return (
    <div
      ref={header}
      className={
        "bg-dark-3 h-12 flex shadow-md border-rose-600 border-b-2 w-[200%] md:h-14 md:w-full z-0 " +
        (expanded ? "-translate-x-1/2" : "")
      }
      style={{ transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <div className="flex-1 p-1 md:p-2 md:w-96 md:flex-none">
        <button
          onClick={onSettingsClick}
          className={
            "group/btn size-10 p-1 transition-all rounded-md " +
            "hover:bg-[#00000020] active:bg-[#00000030]"
          }
        >
          <SettingsIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>
      </div>

      <div className="flex-1 p-1 md:p-2 flex gap-2">
        <button
          onClick={() => setExpanded(false)}
          className={
            "group/btn size-10 p-1 transition-all rounded-md flex-none md:hidden " +
            "hover:bg-[#00000020] active:bg-[#00000030]"
          }
        >
          <BackIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>

        {currRoom && (
          <>
            <div
              className={
                "border-2 border-neutral-400 rounded-full size-[calc(2.5rem-2px)] flex-none" +
                (!currRoom.cover_image ? " p-1" : "")
              }
            >
              {!currRoom.cover_image ? (
                <DefaultPfpIcon className="fill-neutral-400" />
              ) : (
                <img
                  className="rounded-full object-cover"
                  src={global.API_URL + "/files/" + currRoom.cover_image}
                />
              )}
            </div>

            <div className="text-lg my-auto line-clamp-1">
              {currRoom.type === "direct" && "@"}
              {currRoom.name}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
