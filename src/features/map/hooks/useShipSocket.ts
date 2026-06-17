// hooks/useShipSocket.ts

import { useEffect, useRef, useState } from "react";
import type { Ship } from "@/features/map/types/ship";
import { useGetShips } from "./useShip";
import { useQueryClient } from "@tanstack/react-query";

type WsMessage =
  | { type: "ships:snapshot"; payload: Ship[] }
  | { type: "connected"; message: string };

export function useShipSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [wasEverConnected, setWasEverConnected] = useState(false);
  const [websocketError, setWebsocketError] = useState<Error | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const queryClient = useQueryClient();

  const {
    data: ships,
    isLoading,
    isFetched,
    error: shipsApiError,
  } = useGetShips();

  useEffect(() => {
    let isUnmounted = false;
    let socket: WebSocket | null = null;

    const scheduleReconnect = () => {
      if (isUnmounted || reconnectTimeoutRef.current !== null) return;
      reconnectTimeoutRef.current = window.setTimeout(() => {
        reconnectTimeoutRef.current = null;
        connect();
      }, 2000);
    };

    const connect = () => {
      if (isUnmounted) return;
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

      socket.onopen = () => {
        setIsConnected(true);
        setWasEverConnected(true);
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
        if (isUnmounted) return;
        setIsConnected(false);
        setWebsocketError(null);
        console.log("[WS] disconnected");
        scheduleReconnect();
      };

      socket.onerror = (error) => {
        console.error("[WS] error", error);
        setIsConnected(false);
        setWebsocketError(new Error((error as ErrorEvent).message));
      };
    };

    connect();

    return () => {
      isUnmounted = true;
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
      socket?.close();
    };
  }, [queryClient]);

  const hasShips = (ships?.length ?? 0) > 0;
  const error = hasShips ? null : shipsApiError ?? websocketError;
  const isReady = hasShips || (isFetched && !isLoading);
  const isDisconnected = wasEverConnected && !isConnected;

  return { ships, isReady, error, isDisconnected, isConnected };
}
