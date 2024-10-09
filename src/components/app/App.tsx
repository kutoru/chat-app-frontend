import { useEffect, useState } from "react";
import ChatNavigation from "./chat-navigation/ChatNavigation";
import ChatContainer from "./chat-container/ChatContainer";
import ChatHeader from "./ChatHeader";
import WindowDialog from "./window-dialog/WindowDialog";
import Settings from "./window-dialog/Settings";
import NewChat from "./window-dialog/NewChat";
import { useNavigate } from "react-router-dom";
import Message from "../../types/Message";
import ConnectionState from "../../types/ConnectionState";
import requests from "../../requests";
import User from "../../types/User";
import RoomPreview from "../../types/RoomPreview";
import SystemMessage from "../../types/SystemMessage";
import PendingMessage from "../../types/PendingMessage";
import global from "../../global";
import { getRandomId } from "../../utils";
import FileInfo from "../../types/FileInfo";

enum WindowType {
  Hidden,
  Settings,
  AddChat,
}

export default function App() {
  // websocket
  const [wsError, setWsError] = useState<string>();
  const [ws, setWs] = useState<WebSocket>();

  // page layout
  const [expanded, setExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  // ChatNavigation
  const [rooms, setRooms] = useState<RoomPreview[]>([]);

  // WindowDialog
  const [windowShown, setWindowShown] = useState(false);
  const [windowType, setWindowType] = useState(WindowType.Hidden);
  const [userInfo, setUserInfo] = useState<User>();

  // ChatContainer
  const [messageText, setMessageText] = useState("");
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<
    (Message | SystemMessage | PendingMessage)[]
  >([]);

  // mixed
  const [currRoom, setCurrRoom] = useState<RoomPreview>();
  const [focusRoomId, setFocusRoomId] = useState<number>();
  const [pendingFiles] = useState(new Map<number, File[]>());
  const navigate = useNavigate();

  // initial render
  useEffect(() => {
    updateIsSmallScreen();

    const abortController = new AbortController();
    getRooms(abortController.signal);
    return () => abortController.abort();
  }, []);

  // if the screen is big enough, move the layout to its default position
  useEffect(() => {
    if (!isSmallScreen && expanded) {
      setExpanded(false);
    }
  }, [expanded, isSmallScreen]);

  useEffect(() => {
    window.addEventListener("resize", updateIsSmallScreen);
    return () => window.removeEventListener("resize", updateIsSmallScreen);
  }, [isSmallScreen, setIsSmallScreen]);

  // if the window has been hidden, also remove its contents
  useEffect(() => {
    if (!windowShown) {
      setTimeout(() => {
        setWindowType(WindowType.Hidden);
      }, 150);
    }
  }, [windowShown]);

  // if the window contents have appeared, also show the window itself
  useEffect(() => {
    if (windowType !== WindowType.Hidden) {
      setWindowShown(true);
    }
  }, [windowType]);

  // if there is a new request to focus (open) a room, handle it
  useEffect(() => {
    if (!focusRoomId) {
      return;
    }

    const room = rooms.find((v) => v.id === focusRoomId);
    if (room) {
      setFocusRoomId(undefined);
      openRoom(room);
      return;
    }

    const timeoutId = setTimeout(() => setFocusRoomId(undefined), 2500);
    return () => clearTimeout(timeoutId);
  }, [focusRoomId, setFocusRoomId]);

  // websocket initialization
  useEffect(() => {
    if (!ws) {
      setWs(new WebSocket(global.WS_URL));
      return;
    }

    ws.onopen = () => {
      ws?.send("ack");
    };

    ws.onmessage = (msg) => {
      try {
        const result = JSON.parse(msg.data);
        console.log("onmessage", result);

        if (result.type === "message") {
          onNewMessage(result.data);
        } else if (result.type === "files") {
          onNewFiles(result.data);
        }
      } catch (error) {
        console.warn("Received an invalid message data:", msg);
      }
    };
  }, [ws, currRoom, messages, rooms]);

  function openRoom(room: RoomPreview) {
    if (currRoom !== room) {
      clearChat();
      setCurrRoom(room);
    }
  }

  function clearChat() {
    clearInput();
    setMessages([]);
  }

  function clearInput() {
    setMessageText("");
    setMessageFiles([]);
  }

  function updateIsSmallScreen() {
    const currState = window.innerWidth < 768;
    if (currState !== isSmallScreen) {
      setIsSmallScreen(currState);
    }
  }

  function setExpandedChecked(value: boolean) {
    if (isSmallScreen) {
      setExpanded(value);
    }
  }

  async function onSettingsClick() {
    const result = await requests.userGet();
    if (!result.data) {
      // TODO: show the error to the user
      console.warn("Could not get user info", result);
      return;
    }

    setUserInfo(result.data);
    setWindowType(WindowType.Settings);
  }

  async function getRooms(abortSignal?: AbortSignal) {
    const result = await requests.getRooms(abortSignal);
    if (!result.data) {
      if (result.message === "Invalid auth token") {
        navigate("/login?m=unauthorized");
      } else if (result.message !== "Aborted") {
        // TODO: show the error to the user
        console.warn("Could not get user rooms", result);
      }

      return;
    }

    setRooms(result.data);
  }

  function onNewMessage(message: Message) {
    // handle pending files related to the message

    if (message.temp_id) {
      handlePendingFiles(message.temp_id, message.id);
    }

    // add message to the chat if it is currently open

    if (currRoom && message.room_id === currRoom.id) {
      const replaceIndex = messages.findIndex(
        (v: any) => v.temp_id === message.temp_id,
      );

      if (replaceIndex === -1) {
        setMessages([message, ...messages]);
      } else {
        messages[replaceIndex] = message;
        setMessages([...messages]);
      }
    }

    // update the last message on the navigation

    for (let i = 0; i < rooms.length; i++) {
      if (message.room_id === rooms[i].id) {
        rooms[i].message_created = message.created;
        rooms[i].message_text = message.text;
        setRooms([...rooms]);
        return;
      }
    }

    // if a chat wasn't found, fetch it

    requests.getRoomById(message.room_id).then((res) => {
      if (!res.data) {
        console.warn("Could not get a room:", res);
        return;
      }

      setRooms([res.data, ...rooms]);
    });
  }

  function onNewFiles(files: FileInfo[]) {
    const messageId = files[0].message_id;

    const tempMsg = messages.find((v) => isMessage(v) && v.id === messageId);
    if (!tempMsg) {
      return;
    }

    const relevantMessage = tempMsg as Message;
    relevantMessage.files = files;
    setMessages([...messages]);
  }

  function isMessage(
    msg: Message | SystemMessage | PendingMessage,
  ): msg is Message {
    return (msg as any).id !== undefined && (msg as any).username !== undefined;
  }

  function sendMessage(newMessage: PendingMessage) {
    if (!ws) {
      setWsError("Connection is not available");
      return;
    }

    if (newMessage.files.length) {
      pendingFiles.set(newMessage.temp_id, newMessage.files);
    }

    (newMessage as any).files = undefined;
    ws.send(JSON.stringify(newMessage));
  }

  async function handlePendingFiles(messageTempId: number, messageId: number) {
    const files = pendingFiles.get(messageTempId);
    pendingFiles.delete(messageTempId);
    if (!files) {
      return;
    }

    const result = await requests.filesMessagePost(messageId, files);
    if (result.message) {
      console.warn("Could not upload files:", result);
      return;
    }
  }

  function handleSendMessage() {
    if (!currRoom) {
      return;
    }

    const pendingMessage = {
      temp_id: getRandomId(),
      room_id: currRoom.id,
      text: messageText,
      files: messageFiles,
    };

    sendMessage(pendingMessage);
    setMessages([pendingMessage, ...messages]);
    clearInput();
  }

  return (
    <>
      <WindowDialog
        shown={windowShown}
        onCloseClick={() => setWindowShown(false)}
      >
        {windowType === WindowType.Settings && (
          <Settings userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
        {windowType === WindowType.AddChat && (
          <NewChat setFocusRoomId={setFocusRoomId} />
        )}
      </WindowDialog>

      <ChatHeader
        expanded={expanded}
        setExpanded={setExpandedChecked}
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
        onSettingsClick={onSettingsClick}
        currRoom={currRoom}
      />

      <div
        className={
          "flex w-[200%] md:w-full " + (expanded ? "-translate-x-1/2" : "")
        }
        style={{ transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <ChatNavigation
          headerHeight={headerHeight}
          connState={ConnectionState.Connected} // TODO: delete or refactor this
          setExpanded={setExpandedChecked}
          openRoom={openRoom}
          onAddClick={() => setWindowType(WindowType.AddChat)}
          rooms={rooms}
        />

        <ChatContainer
          headerHeight={headerHeight}
          room={currRoom}
          text={messageText}
          setText={setMessageText}
          files={messageFiles}
          setFiles={setMessageFiles}
          messages={messages}
          setMessages={setMessages}
          sendMessage={handleSendMessage}
          messageError={wsError}
        />
      </div>
    </>
  );
}
