import DefaultPfpIcon from "../../../assets/default-pfp.svg?react";
import global from "../../../global";
import Message from "../../../types/Message";
import { formatDateTime } from "../../../utils";

type Props = {
  message: Message;
};

export default function MessageContainer({ message }: Props) {
  function mapImages() {
    const images: JSX.Element[] = [];

    if (!message.files) {
      return images;
    }

    for (let i = 0; i < message.files.length; i++) {
      const file = message.files[i];
      const url = global.API_URL + "/files/" + file.file_hash;

      images.push(
        <a key={file.id} href={url} target="_blank" className="relative">
          <div
            className="absolute size-full bg-transparent top-0 right-0 rounded-md"
            style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)" }}
          />
          <img
            className={"w-full h-16 object-cover rounded-md lg:h-20 xl:h-24"}
            src={url}
          />
        </a>,
      );
    }

    return images;
  }

  return (
    <div
      className={
        "bg-dark-3 shadow-sm w-[90%] h-fit rounded-md md:shadow-md lg:w-[85%] xl:w-[80%]" +
        (message.from_self ? " ms-[10%] lg:ms-[15%] xl:ms-[20%]" : "")
      }
    >
      <div className="flex gap-1 m-1 lg:gap-2 lg:m-2">
        <div
          className={
            "border-2 border-neutral-400 rounded-full size-10 flex-none xl:size-12" +
            (!message.profile_image ? " p-1.5" : "")
          }
        >
          {!message.profile_image ? (
            <DefaultPfpIcon className="fill-neutral-400" />
          ) : (
            <img
              className="rounded-full object-cover"
              src={global.API_URL + "/files/" + message.profile_image}
            />
          )}
        </div>

        <div className="my-auto flex-1 overflow-hidden">
          <div className="text-base text-ellipsis overflow-hidden xl:text-lg">
            @{message.username}
          </div>
          <div className="text-xs text-neutral-400 xl:text-sm">
            {formatDateTime(message.created)}
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-dark-1" />

      <div className="text-sm m-1 lg:m-2 xl:text-base">{message.text}</div>

      {!!message.files?.length && <div className="h-[2px] bg-dark-1" />}

      {!!message.files?.length && (
        <div className="grid grid-flow-row p-0.5 gap-0.5 grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:p-1 lg:gap-1">
          {mapImages()}
        </div>
      )}
    </div>
  );
}
