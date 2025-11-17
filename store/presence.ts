// store/presence.ts
import { create } from "zustand";

export type PresenceStatus = "online" | "idle" | "dnd" | "offline";

export type Presence = {
  userId: string;
  status: PresenceStatus;
  updatedAt: number;
};

type PresenceState = {
  presence: Record<string, Presence>;
  setPresence: (p: Presence) => void;
  removePresence: (userId: string) => void;
};

export const usePresenceStore = create<PresenceState>((set) => ({
  presence: {},

  setPresence: (p) =>
    set((state) => ({
      presence: {
        ...state.presence,
        [p.userId]: p,
      },
    })),

  removePresence: (userId) =>
    set((state) => {
      const updated = { ...state.presence };
      delete updated[userId];
      return { presence: updated };
    }),
}));
