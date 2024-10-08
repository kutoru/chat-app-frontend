import CloseIcon from "../../../assets/close.svg?react";

type Props = {
  filename: string;
  onClick: () => void;
};

export default function AttachedFile({ filename, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={
        "group/btn transition-all rounded-md flex p-1 " +
        "hover:bg-[#00000020] active:bg-[#00000030] hover:text-neutral-300 active:text-neutral-400"
      }
    >
      <span className="my-auto text-xs max-w-24 break-words line-clamp-1 text-ellipsis md:max-w-32 md:text-sm xl:text-base xl:max-w-48">
        {filename}
      </span>

      <CloseIcon className="transition-all size-5 md:size-6 group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
    </button>
  );
}
