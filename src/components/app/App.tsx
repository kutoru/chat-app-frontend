import { useEffect, useState } from "react";
import ChatNavigation from "./ChatNavigation";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";

export default function App() {
  const [expanded, setExpanded] = useState(false);
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

  return (
    <>
      <ChatHeader
        expanded={expanded}
        setExpanded={setExpandedChecked}
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
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
        />

        <ChatContainer headerHeight={headerHeight} />
      </div>
    </>
  );
}
