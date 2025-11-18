"use client";

import { useEffect, useRef } from "react";
import { usePresenceStore, type Presence } from "@/store/presence";

class MockPresenceWS {
  private listeners: Array<(data: any) => void> = [];
  private interval: NodeJS.Timeout | null = null;

  connect() {
    // Simulate random presence updates
    this.interval = setInterval(() => {
      const statuses: Array<Presence["status"]> = [
        "online",
        "idle",
        "dnd",
        "offline",
      ];
      const randomUserId = `u${Math.floor(Math.random() * 5) + 1}`;
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      const update: Presence = {
        userId: randomUserId,
        status: randomStatus,
        updatedAt: Date.now(),
      };

      this.emit("presence:update", update);
    }, 10000); // Update every 10 seconds
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  on(event: string, handler: (data: any) => void) {
    this.listeners.push(handler);
  }

  off(handler: (data: any) => void) {
    this.listeners = this.listeners.filter((h) => h !== handler);
  }

  private emit(event: string, data: any) {
    this.listeners.forEach((handler) => handler(data));
  }
}

const presenceWS = new MockPresenceWS();

export function usePresenceWebSocket() {
  const { setPresence } = usePresenceStore();
  const connected = useRef(false);

  useEffect(() => {
    if (connected.current) return;

    const handler = (presence: Presence) => {
      setPresence(presence);
    };

    presenceWS.on("presence:update", handler);
    presenceWS.connect();
    connected.current = true;

    return () => {
      presenceWS.off(handler);
      presenceWS.disconnect();
      connected.current = false;
    };
  }, [setPresence]);

  return { connected: connected.current };
}
