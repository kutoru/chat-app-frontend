import { useState } from "react";
import ConnectionState from "../types/ConnectionState";
import global from "../global";
import Message from "../types/Message";

export default function useWebsocket(
  onNewMessage: (message: Message) => void,
): [ConnectionState, string | undefined] {
  const [connState, setConnState] = useState(ConnectionState.Loading);
  const [errorMessage, setErrorMessage] = useState<string>();

  let ws: WebSocket = new WebSocket(global.WS_URL);

  ws.onclose = (e) => {
    console.log("onclose", e);
    setConnState(ConnectionState.Disconnected);

    if (e.reason) {
      setErrorMessage(e.reason);
    }
  };

  ws.onmessage = (m) => {
    console.log("onmessage", m);

    try {
      //   const chatMessage = JSON.parse(m);
      //   onNewMessage(chatMessage);
    } catch (error) {}
  };

  ws.onopen = (e) => {
    console.log("onopen", e);
    setConnState(ConnectionState.Connected);

    ws.send("Hello from client on open");
  };

  return [connState, errorMessage];
}
