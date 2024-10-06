import { useState } from "react";
import SendIcon from "../../assets/send.svg?react";
import AttachmentIcon from "../../assets/attachment.svg?react";
import AttachedFile from "./AttachedFile";
import Message from "./Message";
import SystemMessage from "./SystemMessage";

type Props = {
  headerHeight: number;
};

export default function ChatContainer({ headerHeight }: Props) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <div
      className="bg-dark-1 flex-1 flex"
      style={{ height: `calc(100dvh - ${headerHeight}px)` }}
    >
      <div className="h-full w-dvw max-w-4xl mx-auto bga-[#99000030] flex flex-col md:w-full">
        <div className="flex-1 flex flex-col-reverse p-1 gap-1 overflow-auto scrollbar lg:p-2 lg:gap-2">
          <Message fromSelf={false} images={[]} />
          <SystemMessage isError={true} />
          <Message fromSelf={true} images={[]} />
          <Message fromSelf={false} images={["a"]} />
          <Message fromSelf={false} images={[]} />
          <Message fromSelf={true} images={[]} />
          <Message fromSelf={true} images={["a"]} />
          <Message fromSelf={false} images={[]} />
          <Message fromSelf={true} images={[]} />
          <Message fromSelf={false} images={["a"]} />
          <SystemMessage isError={false} />
        </div>

        <div className="flex-none bg-dark-2 border-t-2 border-rose-600 xl:rounded-xl">
          <div className="flex gap-1 p-1 lg:gap-2 lg:p-2">
            <textarea
              placeholder="Message text"
              value={text}
              onInput={(e) => setText((e.target as HTMLInputElement).value)}
              className={
                "flex-1 bg-dark-3 p-1 rounded-md resize-none scrollbar " +
                "focus:outline focus:outline-2 focus:outline-rose-600"
              }
            />

            <div className="flex flex-col gap-1 lg:gap-2">
              <button
                className={
                  "group/btn size-10 p-1 transition-all rounded-md bg-rose-600 flex-none " +
                  "hover:bg-rose-700 active:bg-rose-800"
                }
              >
                <SendIcon className="rotate-[-25deg] -translate-y-0.5 translate-x-[1px] size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
              </button>

              <button
                className={
                  "group/btn size-10 p-1 transition-all rounded-md " +
                  "hover:bg-[#00000020] active:bg-[#00000030]"
                }
              >
                <AttachmentIcon className="rotate-45 size-full transition-all group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400" />
              </button>
            </div>
          </div>

          {!!files.length && (
            <div className="flex px-1 pb-1 gap-1 w-dvw overflow-auto max-w-4xl scrollbar lg:px-2 lg:pb-2 lg:gap-2 md:w-[calc(100dvw-24rem)]">
              <AttachedFile />
              <AttachedFile />
              <AttachedFile />
              <AttachedFile />
              <AttachedFile />
              <AttachedFile />
              <AttachedFile />
              <AttachedFile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
