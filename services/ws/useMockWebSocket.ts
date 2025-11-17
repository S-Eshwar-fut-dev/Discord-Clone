// services/ws/useMockWebSocket.ts
"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/components/chat/MessageItem";

/**
 * Simple singleton event bus to simulate server broadcasts.
 * - use connect() to "open" connection
 * - send('message:create', payload) to broadcast to all listeners (including sender)
 */

type Handler = (data: any) => void;

class MockBus {
  bus = new EventTarget();

  send(eventName: string, payload: any) {
    const ev = new CustomEvent(eventName, { detail: payload });
    // fire asynchronously to mimic network
    setTimeout(() => this.bus.dispatchEvent(ev), 20);
  }

  on(eventName: string, handler: Handler) {
    const wrapper = (ev: Event) => handler((ev as CustomEvent).detail);
    // store wrapper so we can remove (keeps simple)
    (handler as any).__wrapper = wrapper;
    this.bus.addEventListener(eventName, wrapper as EventListener);
  }

  off(eventName: string, handler: Handler) {
    const wrapper = (handler as any).__wrapper;
    if (wrapper)
      this.bus.removeEventListener(eventName, wrapper as EventListener);
  }
}

const BUS = new MockBus();

export function useMockWebSocket(
  channelId: string,
  onMessage: (m: ChatMessage) => void
) {
  const connected = useRef(false);

  useEffect(() => {
    if (!channelId) return;
    // subscribe to server broadcasts for this channel
    const handler = (payload: ChatMessage) => {
      if (payload.channelId === channelId) onMessage(payload);
    };
    BUS.on("message:created", handler);
    connected.current = true;

    return () => {
      BUS.off("message:created", handler);
      connected.current = false;
    };
  }, [channelId, onMessage]);

  function sendCreateMessage(payload: ChatMessage) {
    // in a real WS you would send to server - here we "persist" and broadcast
    // fake server adds id + createdAt and broadcasts back as created message
    const serverMessage: ChatMessage = {
      ...payload,
      id: payload.id.startsWith("temp_")
        ? "m_" + Math.random().toString(36).slice(2, 9)
        : payload.id,
      createdAt: new Date().toISOString(),
      temp: false,
    };
    // broadcast
    BUS.send("message:created", serverMessage);
  }

  return {
    connected: connected.current,
    sendCreateMessage,
    // expose BUS for advanced testing if needed
    _bus: BUS,
  };
}
