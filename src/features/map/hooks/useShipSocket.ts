// hooks/useShipSocket.ts

import { useEffect, useState } from "react";
import type { Ship } from "@/features/map/types/ship";
import { useGetShips } from "./useShip";
import { useQueryClient } from "@tanstack/react-query";

type WsMessage =
  | { type: "ships:snapshot"; payload: Ship[] }
  | { type: "connected"; message: string };

export function useShipSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [websocketError, setWebsocketError] = useState<Error | null>(null);

  const queryClient = useQueryClient();

  const {
    data: ships,
    isLoading,
    isFetched,
    error: shipsApiError,
  } = useGetShips();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    socket.onopen = () => {
      setIsConnected(true);
      setWebsocketError(null);
      console.log("[WS] connected");
    };

    socket.onmessage = (event) => {
      const message: WsMessage = JSON.parse(event.data);

      if (message.type === "ships:snapshot") {
        queryClient.setQueryData(["shipsData"], message.payload);
        setWebsocketError(null);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      setWebsocketError(null);
      console.log("[WS] disconnected");
    };

    socket.onerror = (error) => {
      console.error("[WS] error", error);
      setWebsocketError(new Error((error as ErrorEvent).message));
    };

    return () => {
      socket.close();
    };
  }, []);

  const error =
    ships?.length === 0 ? (shipsApiError ?? websocketError) : websocketError;
  const isReady = ships?.length === 0 ? isFetched && !isLoading : isConnected;

  return { ships, isReady, error };
}
