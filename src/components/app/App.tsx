import { useEffect, useState } from "react";
import ChatNavigation from "./chat-navigation/ChatNavigation";
import ChatContainer from "./chat-container/ChatContainer";
import ChatHeader from "./ChatHeader";
import WindowDialog from "./window-dialog/WindowDialog";
import Settings from "./window-dialog/Settings";
import NewChat from "./window-dialog/NewChat";
import useWebsocket from "../../hooks/useWebsocket";
import { useNavigate } from "react-router-dom";
import Message from "../../types/Message";
import ConnectionState from "../../types/ConnectionState";
import requests from "../../requests";
import User from "../../types/User";
import RoomPreview from "../../types/RoomPreview";
import SystemMessage from "../../types/SystemMessage";

enum WindowType {
  Hidden,
  Settings,
  AddChat,
}

export default function App() {
  //   const [connState, connError] = useWebsocket(onNewMessage);

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
  const [text, setText] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [messages, setMessages] = useState<(Message | SystemMessage)[]>([]);

  // mixed
  const [currRoom, setCurrRoom] = useState<RoomPreview>();
  const [focusRoomId, setFocusRoomId] = useState<number>();
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

  function openRoom(room: RoomPreview) {
    if (currRoom !== room) {
      clearChat();
      setCurrRoom(room);
    }
  }

  function clearChat() {
    setText("");
    setFiles([]);
    setMessages([]);
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
      } else {
        // TODO: show the error to the user
        console.warn("Could not get user rooms", result);
      }

      return;
    }

    setRooms(result.data);
  }

  function onNewMessage(message: Message) {
    console.log("onNewMessage", message);
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
          text={text}
          setText={setText}
          files={files}
          setFiles={setFiles}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
}
