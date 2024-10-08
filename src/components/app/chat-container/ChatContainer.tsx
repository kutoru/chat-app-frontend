import { useEffect, useState } from "react";
import SendIcon from "../../../assets/send.svg?react";
import AttachmentIcon from "../../../assets/attachment.svg?react";
import AttachedFile from "./AttachedFile";
import MessageContainer from "./MessageContainer";
import SystemMessageContainer from "./SystemMessageContainer";
import Message from "../../../types/Message";
import RoomPreview from "../../../types/RoomPreview";
import requests from "../../../requests";
import SystemMessage from "../../../types/SystemMessage";
import PendingMessage from "../../../types/PendingMessage";
import PendingMessageContainer from "./PendingMessageContainer";

type AllMessages = Message | SystemMessage | PendingMessage;

type Props = {
  headerHeight: number;
  room: RoomPreview | undefined;
  text: string;
  setText: (v: string) => void;
  files: File[];
  setFiles: (v: File[]) => void;
  messages: AllMessages[];
  setMessages: (v: AllMessages[]) => void;
  sendMessage: () => void;
  messageError: string | undefined;
};

export default function ChatContainer({
  headerHeight,
  room,
  text,
  setText,
  files,
  setFiles,
  messages,
  setMessages,
  sendMessage,
  messageError,
}: Props) {
  useEffect(() => {
    if (room) {
      const abortController = new AbortController();
      getMessages(abortController.signal);
      return () => abortController.abort();
    }
  }, [room]);

  useEffect(() => {
    if (messageError) {
      showError(messageError);
    }
  }, [messageError]);

  async function getMessages(abortSignal?: AbortSignal) {
    if (!room) {
      return;
    }

    const result = await requests.getMessages(room.id, abortSignal);
    if (!result.data) {
      showError("Could not get messages. Reason: " + result.message);
      return;
    }

    setMessages(result.data);
  }

  function isSystemMessage(msg: AllMessages): msg is SystemMessage {
    return !(msg as any).username;
  }

  function isPendingMessage(msg: AllMessages): msg is PendingMessage {
    return !!(msg as any).files;
  }

  function mapMessages() {
    const msgElements = [];

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      if (isPendingMessage(msg)) {
        msgElements.push(
          <PendingMessageContainer key={msg.temp_id} message={msg} />,
        );
      } else if (isSystemMessage(msg)) {
        msgElements.push(
          <SystemMessageContainer
            key={msg.id || Math.random()}
            message={msg}
          />,
        );
      } else {
        msgElements.push(<MessageContainer key={msg.id} message={msg} />);
      }
    }

    return msgElements;
  }

  function showError(text: string) {
    setMessages([
      {
        isError: true,
        text: text,
      },
      ...messages,
    ]);
  }

  async function selectFiles() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.click();

    const newFiles: FileList | undefined = await new Promise((resolve) => {
      input.onchange = (e: Event) => {
        resolve((e.target as HTMLInputElement | null)?.files || undefined);
      };
    });

    if (newFiles) {
      setFiles([...files, ...newFiles]);
    }
  }

  function removeFile(index: number) {
    files.splice(index, 1);
    setFiles([...files]);
  }

  function mapFiles() {
    const elements: JSX.Element[] = [];
    if (!files) {
      return elements;
    }

    for (let i = 0; i < files.length; i++) {
      elements.push(
        <AttachedFile
          key={i}
          filename={files[i].name}
          onClick={() => removeFile(i)}
        />,
      );
    }

    return elements;
  }

  return (
    <div
      className="bg-dark-1 flex-1 flex"
      style={{ height: `calc(100dvh - ${headerHeight}px)` }}
    >
      <div className="h-full w-dvw max-w-4xl mx-auto bga-[#99000030] flex flex-col md:w-full">
        {!room ? (
          <div className="flex-1 p-16 flex">
            <div className="m-auto text-neutral-400 text-2xl cursor-default text-center md:text-3xl lg:text-4xl">
              Select a chat on the left
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col-reverse p-1 gap-1 overflow-auto scrollbar lg:p-2 lg:gap-2">
            {mapMessages()}
          </div>
        )}

        <div className="flex-none bg-dark-2 border-t-2 border-rose-600 xl:rounded-xl">
          <div className="flex gap-1 p-1 lg:gap-2 lg:p-2">
            <textarea
              disabled={!room}
              placeholder="Message text"
              value={text}
              onInput={(e) => setText((e.target as HTMLInputElement).value)}
              className={
                "flex-1 bg-dark-3 p-1 rounded-md resize-none scrollbar" +
                " focus:outline focus:outline-2 focus:outline-rose-600" +
                " disabled:placeholder-neutral-600 disabled:bg-dark-1.5"
              }
            />

            <div className="flex flex-col gap-1 lg:gap-2">
              <button
                disabled={!room}
                onClick={sendMessage}
                className={
                  "group/btn size-10 p-1 transition-all rounded-md bg-rose-600 flex-none " +
                  "hover:bg-rose-700 active:bg-rose-800 disabled:bg-gray-500"
                }
              >
                <SendIcon
                  className={
                    "rotate-[-25deg] -translate-y-0.5 translate-x-[1px] size-full transition-all" +
                    " group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400 group-disabled/btn:fill-neutral-300"
                  }
                />
              </button>

              <button
                disabled={!room}
                onClick={selectFiles}
                className={
                  "group/btn size-10 p-1 transition-all rounded-md " +
                  "hover:bg-[#00000020] active:bg-[#00000030] disabled:bg-transparent"
                }
              >
                <AttachmentIcon
                  className={
                    "rotate-45 size-full transition-all" +
                    " group-hover/btn:fill-neutral-300 group-active/btn:fill-neutral-400 group-disabled/btn:fill-neutral-400"
                  }
                />
              </button>
            </div>
          </div>

          {!!files?.length && (
            <div className="flex px-1 pb-1 gap-1 w-dvw overflow-auto max-w-4xl scrollbar lg:px-2 lg:pb-2 lg:gap-2 md:w-[calc(100dvw-24rem)]">
              {mapFiles()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
