import { useEffect, useState } from "react";
import ChatNavigation from "./chat-navigation/ChatNavigation";
import ChatContainer from "./chat-container/ChatContainer";
import ChatHeader from "./ChatHeader";
import WindowDialog from "./window-dialog/WindowDialog";
import Settings from "./window-dialog/Settings";
import NewChat from "./window-dialog/NewChat";
import useWebsocket from "../../hooks/useWebsocket";
import Room from "../../types/Room";
import { useNavigate } from "react-router-dom";
import Message from "../../types/Message";
import ConnectionState from "../../types/ConnectionState";
import requests from "../../requests";
import User from "../../types/User";
import RoomPreview from "../../types/RoomPreview";

enum WindowType {
  Hidden,
  Settings,
  AddChat,
}

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [windowShown, setWindowShown] = useState(false);
  const [windowType, setWindowType] = useState(WindowType.Hidden);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  //   const [connState, connError] = useWebsocket(onNewMessage);
  const connState = ConnectionState.Connected;
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<RoomPreview[]>([]);
  const [userInfo, setUserInfo] = useState<User>();
  const [focusRoomId, setFocusRoomId] = useState<number>();

  useEffect(() => {
    onResize();

    const abortController = new AbortController();
    getRooms(abortController.signal);
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (!isSmallScreen && expanded) {
      setExpanded(false);
    }
  }, [expanded, isSmallScreen]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isSmallScreen, setIsSmallScreen]);

  function onResize() {
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

  useEffect(() => {
    if (!windowShown) {
      setTimeout(() => {
        setWindowType(WindowType.Hidden);
      }, 150);
    }
  }, [windowShown]);

  useEffect(() => {
    if (windowType !== WindowType.Hidden) {
      setWindowShown(true);
    }
  }, [windowType]);

  //   useEffect(() => {
  //     if (connError === "Invalid auth token") {
  //       navigate("/login");
  //     }
  //   }, [connError]);

  async function onSettingsClick() {
    const userInfoRes = await requests.userGet();
    if (!userInfoRes.data) {
      console.warn("Could not get user info");
      return;
    }

    setUserInfo(userInfoRes.data);
    setWindowType(WindowType.Settings);
  }

  async function getRooms(abortSignal?: AbortSignal) {
    const result = await requests.getRooms(abortSignal);
    console.log(result);
    if (result.message || !result.data) {
      if (result.message === "Invalid auth token") {
        navigate("/login");
      } else {
        // TODO: show the error to the user
      }

      return;
    }

    setRooms(result.data);
  }

  function onNewMessage(message: Message) {
    console.log("onNewMessage", message);
  }

  function openRoom(room: Room) {
    console.log("openRoom:", room);
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
      />

      <div
        className={
          "flex w-[200%] md:w-full " + (expanded ? "-translate-x-1/2" : "")
        }
        style={{ transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <ChatNavigation
          headerHeight={headerHeight}
          connState={connState}
          setExpanded={setExpandedChecked}
          openRoom={openRoom}
          onAddClick={() => setWindowType(WindowType.AddChat)}
          rooms={rooms}
        />

        <ChatContainer headerHeight={headerHeight} />
      </div>
    </>
  );
}
