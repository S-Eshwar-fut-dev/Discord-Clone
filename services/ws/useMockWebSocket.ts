"use client";

import { useEffect, useRef, useCallback } from "react";
import type { ChatMessage } from "@/types/chat";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/ws";

interface WSMessage {
  type: string;
  payload?: any;
  tempId?: string | null;
}

export function useWebSocket(
  channelId: string,
  onMessage: (m: ChatMessage) => void
) {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const connected = useRef(false);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    try {
      const socket = new WebSocket(WS_URL);

      socket.onopen = () => {
        console.log("[WS] Connected");
        connected.current = true;
      };

      socket.onmessage = (event) => {
        try {
          const data: WSMessage = JSON.parse(event.data);

          if (data.type === "connection:ready") {
            console.log("[WS] Connection ready");
          }

          if (data.type === "message:created" && data.payload) {
            const msg = data.payload as ChatMessage;
            if (msg.channelId === channelId) {
              onMessage(msg);
            }
          }

          if (data.type === "presence:update" && data.payload) {
            // Handle presence updates if needed
            console.log("[WS] Presence update:", data.payload);
          }
        } catch (err) {
          console.error("[WS] Error parsing message:", err);
        }
      };

      socket.onerror = (error) => {
        console.error("[WS] Error:", error);
      };

      socket.onclose = () => {
        console.log("[WS] Disconnected");
        connected.current = false;
        // Reconnect after 3 seconds
        reconnectTimeout.current = setTimeout(connect, 3000);
      };

      ws.current = socket;
    } catch (err) {
      console.error("[WS] Connection error:", err);
      reconnectTimeout.current = setTimeout(connect, 3000);
    }
  }, [channelId, onMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  const sendCreateMessage = useCallback(
    (payload: {
      channelId: string;
      content: string;
      authorId: string;
      tempId?: string;
      attachments?: Array<{ url: string; filename?: string }>;
    }) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "message:create",
            payload,
          })
        );
      } else {
        console.error("[WS] Not connected");
      }
    },
    []
  );

  const setPresence = useCallback(
    (userId: string, status: "online" | "idle" | "dnd" | "offline") => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "presence:set",
            payload: { userId, status },
          })
        );
      }
    },
    []
  );

  return {
    connected: connected.current,
    sendCreateMessage,
    setPresence,
  };
}
