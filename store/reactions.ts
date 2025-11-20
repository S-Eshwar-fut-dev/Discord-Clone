import { create } from "zustand";
import type { Reaction, MessageReaction } from "@/types/reaction";

interface ReactionsState {
  reactions: Map<string, Reaction[]>; // messageId -> Reaction[]

  getReactions: (messageId: string) => Reaction[];
  addReaction: (messageId: string, emoji: string, userId: string) => void;
  removeReaction: (messageId: string, emoji: string, userId: string) => void;
  setReactions: (messageId: string, reactions: Reaction[]) => void;
  clearReactions: (messageId: string) => void;
}

export const useReactionsStore = create<ReactionsState>((set, get) => ({
  reactions: new Map(),

  getReactions: (messageId) => {
    return get().reactions.get(messageId) || [];
  },

  addReaction: (messageId, emoji, userId) => {
    set((state) => {
      const newReactions = new Map(state.reactions);
      const messageReactions = newReactions.get(messageId) || [];

      // Find if emoji already exists
      const existingIndex = messageReactions.findIndex(
        (r) => r.emoji === emoji
      );

      if (existingIndex >= 0) {
        // Add user to existing reaction
        const existing = messageReactions[existingIndex];
        if (!existing.users.includes(userId)) {
          messageReactions[existingIndex] = {
            ...existing,
            count: existing.count + 1,
            users: [...existing.users, userId],
            me: existing.me || userId === "me", // Update 'me' if current user
          };
        }
      } else {
        // Create new reaction
        messageReactions.push({
          emoji,
          count: 1,
          users: [userId],
          me: userId === "me",
        });
      }

      newReactions.set(messageId, messageReactions);
      return { reactions: newReactions };
    });
  },

  removeReaction: (messageId, emoji, userId) => {
    set((state) => {
      const newReactions = new Map(state.reactions);
      const messageReactions = newReactions.get(messageId) || [];

      const existingIndex = messageReactions.findIndex(
        (r) => r.emoji === emoji
      );

      if (existingIndex >= 0) {
        const existing = messageReactions[existingIndex];
        const newUsers = existing.users.filter((id) => id !== userId);

        if (newUsers.length === 0) {
          // Remove reaction entirely if no users left
          messageReactions.splice(existingIndex, 1);
        } else {
          // Update reaction
          messageReactions[existingIndex] = {
            ...existing,
            count: newUsers.length,
            users: newUsers,
            me: newUsers.includes("me"),
          };
        }
      }

      newReactions.set(messageId, messageReactions);
      return { reactions: newReactions };
    });
  },

  setReactions: (messageId, reactions) => {
    set((state) => {
      const newReactions = new Map(state.reactions);
      newReactions.set(messageId, reactions);
      return { reactions: newReactions };
    });
  },

  clearReactions: (messageId) => {
    set((state) => {
      const newReactions = new Map(state.reactions);
      newReactions.delete(messageId);
      return { reactions: newReactions };
    });
  },
}));
