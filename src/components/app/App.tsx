import { useEffect, useState } from "react";
import ChatNavigation from "./ChatNavigation";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import WindowDialog from "./WindowDialog";
import Settings from "./Settings";
import NewChat from "./NewChat";

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

  useEffect(() => {
    if (!isSmallScreen && expanded) {
      setExpanded(false);
    }
  }, [expanded, isSmallScreen]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isSmallScreen, setIsSmallScreen]);

  useEffect(() => {
    onResize();
  }, []);

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

  return (
    <>
      <WindowDialog
        shown={windowShown}
        onCloseClick={() => setWindowShown(false)}
      >
        {windowType === WindowType.Settings && <Settings />}
        {windowType === WindowType.AddChat && <NewChat />}
      </WindowDialog>

      <ChatHeader
        expanded={expanded}
        setExpanded={setExpandedChecked}
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
        onSettingsClick={() => setWindowType(WindowType.Settings)}
      />

      <div
        className={
          "flex w-[200%] md:w-full " + (expanded ? "-translate-x-1/2" : "")
        }
        style={{ transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <ChatNavigation
          headerHeight={headerHeight}
          setExpanded={setExpandedChecked}
          onAddClick={() => setWindowType(WindowType.AddChat)}
        />

        <ChatContainer headerHeight={headerHeight} />
      </div>
    </>
  );
}
