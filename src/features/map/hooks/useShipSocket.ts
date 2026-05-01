// hooks/useShipSocket.ts

import { useEffect, useState } from "react";
import type { Ship } from "@/features/map/types/ship";

type WsMessage =
  | { type: "ships:snapshot"; payload: Ship[] }
  | { type: "connected"; message: string };

export function useShipSocket() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    socket.onopen = () => {
      setIsConnected(true);
      console.log("[WS] connected");
    };

    socket.onmessage = (event) => {
      const message: WsMessage = JSON.parse(event.data);

      if (message.type === "ships:snapshot") {
        setShips(message.payload);
        setError(null);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("[WS] disconnected");
    };

    socket.onerror = (error) => {
      console.error("[WS] error", error);
      setError(new Error((error as ErrorEvent).message));
    };

    return () => {
      socket.close();
    };
  }, []);

  return { ships, isConnected, error };
}
