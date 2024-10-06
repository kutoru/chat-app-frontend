import CloseIcon from "../../assets/close.svg?react";

export default function AttachedFile() {
  return (
    <button
      className={
        "group/btn transition-all rounded-md flex p-1 " +
        "hover:bg-[#00000020] active:bg-[#00000030] hover:text-neutral-300 active:text-neutral-400"
      }
    >
      <span className="my-auto max-w-32 text-ellipsis overflow-hidden ">
        filenameasdlkfjasl;dfjasl;dfjkasdkl;fjasld;fkjasl;jaslfjkl;asdfl;kasdfl;sajl;kadfl;asdj.png
      </span>

      <CloseIcon className="transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
    </button>
  );
}
