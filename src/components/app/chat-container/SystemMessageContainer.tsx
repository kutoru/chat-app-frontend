import SystemMessage from "../../../types/SystemMessage";
import { formatDateTime } from "../../../utils";

type Props = {
  message: SystemMessage;
};

export default function SystemMessageContainer({ message }: Props) {
  return (
    <div className="w-full text-center my-2">
      {!!message.isError ? (
        <div className="text-red-500 xl:text-lg">{message.text}</div>
      ) : (
        <>
          <div className="text-lg text-neutral-400 xl:text-xl">
            {message.text}
          </div>
          {!!message.created && (
            <div className="text-sm text-neutral-500 xl:text-base">
              {formatDateTime(message.created)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
