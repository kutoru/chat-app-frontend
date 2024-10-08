import PendingMessage from "../../../types/PendingMessage";

type Props = {
  message: PendingMessage;
};

export default function PendingMessageContainer({ message }: Props) {
  return (
    <div
      className={
        "bg-dark-3 shadow-sm w-[90%] h-fit rounded-md md:shadow-md lg:w-[85%] xl:w-[80%]" +
        " ms-[10%] lg:ms-[15%] xl:ms-[20%]"
      }
    >
      <div className="flex gap-1 m-1 lg:gap-2 lg:m-2">
        <div className="my-auto flex-1 overflow-hidden">
          <div className="text-base text-ellipsis overflow-hidden xl:text-lg"></div>
          <div className="text-xs text-neutral-400 xl:text-sm">Loading...</div>
        </div>
      </div>

      <div className="h-[2px] bg-dark-1" />

      <div className="text-sm m-1 lg:m-2 xl:text-base">{message.text}</div>
    </div>
  );
}
