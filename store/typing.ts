import { create } from "zustand";

export interface TypingUser {
  userId: string;
  username: string;
  avatar?: string | null;
  timestamp: number;
}

interface TypingState {
  // Map channelId -> List of typing users
  typingUsers: Record<string, TypingUser[]>;

  addTypingUser: (
    channelId: string,
    user: Omit<TypingUser, "timestamp">
  ) => void;
  removeTypingUser: (channelId: string, userId: string) => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  typingUsers: {},

  addTypingUser: (channelId, user) =>
    set((state) => {
      const current = state.typingUsers[channelId] || [];
      // Remove existing entry for this user if present (to update timestamp)
      const filtered = current.filter((u) => u.userId !== user.userId);

      return {
        typingUsers: {
          ...state.typingUsers,
          [channelId]: [...filtered, { ...user, timestamp: Date.now() }],
        },
      };
    }),

  removeTypingUser: (channelId, userId) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [channelId]: (state.typingUsers[channelId] || []).filter(
          (u) => u.userId !== userId
        ),
      },
    })),
}));
