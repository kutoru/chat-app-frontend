import CloseIcon from "../../assets/close.svg?react";

type Props = {
  children: React.ReactNode;
  shown: boolean;
  onCloseClick: () => void;
};

export default function WindowDialog({ children, shown, onCloseClick }: Props) {
  return (
    <div
      onClick={onCloseClick}
      className={
        "fixed w-dvw h-dvh bg-[#00000070] flex z-10 transition-[opacity,visibility]" +
        (shown ? "" : " opacity-0 invisible")
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          "bg-dark-2 shadow-md border-t-4 border-rose-600 px-4 py-8 h-fit max-h-dvh w-full m-auto relative overflow-y-auto scrollbar " +
          "md:w-[600px] md:p-10 md:rounded-xl"
        }
      >
        <div className="absolute top-0 right-0 size-fit p-1 md:p-2">
          <button
            onClick={onCloseClick}
            className={
              "group/btn size-10 p-1 transition-all rounded-md " +
              "hover:bg-[#00000020] active:bg-[#00000030]"
            }
          >
            <CloseIcon className="size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
          </button>
        </div>

        <div className="">{children}</div>
      </div>
    </div>
  );
}
