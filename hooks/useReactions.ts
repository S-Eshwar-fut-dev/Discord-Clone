"use client";

import { useCallback } from "react";
import { useReactionsStore } from "@/store/reactions";
import { wsClient } from "@/lib/wsClient";
import type { Reaction } from "@/types/reaction";

interface UseReactionsReturn {
  getReactions: (messageId: string) => Reaction[];
  addReaction: (messageId: string, emoji: string) => void;
  removeReaction: (messageId: string, emoji: string) => void;
  toggleReaction: (messageId: string, emoji: string) => void;
}

export function useReactions(userId: string): UseReactionsReturn {
  const store = useReactionsStore();

  const addReaction = useCallback(
    (messageId: string, emoji: string) => {
      // Optimistic update
      store.addReaction(messageId, emoji, userId);

      // Send to server via WebSocket
      if (wsClient.isConnected) {
        wsClient.send("reaction:add", {
          messageId,
          emoji,
          userId,
        });
      }
    },
    [userId, store]
  );

  const removeReaction = useCallback(
    (messageId: string, emoji: string) => {
      // Optimistic update
      store.removeReaction(messageId, emoji, userId);

      // Send to server via WebSocket
      if (wsClient.isConnected) {
        wsClient.send("reaction:remove", {
          messageId,
          emoji,
          userId,
        });
      }
    },
    [userId, store]
  );

  const toggleReaction = useCallback(
    (messageId: string, emoji: string) => {
      const reactions = store.getReactions(messageId);
      const existing = reactions.find((r) => r.emoji === emoji);

      if (existing?.me) {
        removeReaction(messageId, emoji);
      } else {
        addReaction(messageId, emoji);
      }
    },
    [store, addReaction, removeReaction]
  );

  return {
    getReactions: store.getReactions,
    addReaction,
    removeReaction,
    toggleReaction,
  };
}
