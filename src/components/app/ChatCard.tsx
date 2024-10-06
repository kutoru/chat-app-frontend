import DefaultPfpIcon from "../../assets/default-pfp.svg?react";

type Props = {
  onClick: () => void;
};

export default function ChatCard({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="border-b-2 border-dark-1 p-2 flex gap-2 cursor-pointer hover:bg-dark-1.5 active:bg-dark-1 select-none md:p-3 md:gap-3"
    >
      <div className="border-2 border-neutral-400 rounded-full size-12 flex-none p-1.5">
        <DefaultPfpIcon className="fill-neutral-400" />
      </div>

      <div className="flex-1 flex">
        <div className="my-auto w-full">
          <div className="flex">
            <div className="text-ellipsis overflow-hidden max-w-48">
              @username
            </div>

            <div className="flex-1" />

            <div className="text-neutral-400 text-sm">2024/10/06</div>
          </div>

          <div className="line-clamp-1 text-neutral-300">
            Hello there, this is going to be the last message text, if it is
            present of course
          </div>
        </div>
      </div>
    </div>
  );
}
