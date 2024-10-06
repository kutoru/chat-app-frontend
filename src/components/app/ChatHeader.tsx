import SettingsIcon from "../../assets/settings.svg?react";
import BackIcon from "../../assets/back.svg?react";
import { useEffect, useRef } from "react";

type Props = {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  headerHeight: number;
  setHeaderHeight: (v: number) => void;
};

export default function ChatHeader({
  expanded,
  setExpanded,
  headerHeight,
  setHeaderHeight,
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
        "bg-dark-3 h-12 flex shadow-md border-rose-600 border-b-2 w-[200%] md:h-14 md:w-full " +
        (expanded ? "-translate-x-1/2" : "")
      }
      style={{ transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <div className="flex-1 p-1 md:p-2 md:w-96 md:flex-none">
        <button
          className={
            "group/btn size-10 p-1 transition-all rounded-md " +
            "hover:bg-[#00000020] active:bg-[#00000030]"
          }
        >
          <SettingsIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>
      </div>

      <div className="hidden bg-dark-2 w-[2px] md:block" />

      <div className="flex-1 p-1 md:p-2 flex gap-1 md:gap-2">
        <button
          onClick={() => setExpanded(false)}
          className={
            "group/btn size-10 p-1 transition-all rounded-md flex-none md:hidden " +
            "hover:bg-[#00000020] active:bg-[#00000030]"
          }
        >
          <BackIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
        </button>

        <div className="text-lg my-auto line-clamp-1">
          Profile pic, chat name
        </div>
      </div>
    </div>
  );
}
