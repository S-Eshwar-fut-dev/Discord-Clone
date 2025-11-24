"use client";

import { create } from "zustand";
import { ChatMessage } from "@/types/chat";

interface Thread {
  id: string;
  name: string;
  parentMessage: ChatMessage;
}

interface ThreadsState {
  activeThread: Thread | null;
  openThread: (message: ChatMessage) => void;
  closeThread: () => void;
}

export const useThreadsStore = create<ThreadsState>((set) => ({
  activeThread: null,

  openThread: (message) =>
    set({
      activeThread: {
        id: message.id,
        name: `Thread: ${message.content.substring(0, 20)}...`, // Default name
        parentMessage: message,
      },
    }),

  closeThread: () => set({ activeThread: null }),
}));

export function useThreads() {
  return useThreadsStore();
}
