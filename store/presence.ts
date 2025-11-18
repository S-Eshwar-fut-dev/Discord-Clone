import { create } from "zustand";

export type PresenceStatus = "online" | "idle" | "dnd" | "offline";

export interface Presence {
  userId: string;
  status: PresenceStatus;
  customStatus?: string | null;
  updatedAt: number;
}

interface PresenceState {
  presence: Record<string, Presence>;
  setPresence: (p: Presence) => void;
  bulkSetPresence: (presences: Presence[]) => void;
  removePresence: (userId: string) => void;
  getPresence: (userId: string) => Presence | null;
}

export const usePresenceStore = create<PresenceState>((set, get) => ({
  presence: {},

  setPresence: (p) =>
    set((state) => ({
      presence: {
        ...state.presence,
        [p.userId]: p,
      },
    })),

  bulkSetPresence: (presences) =>
    set((state) => {
      const updated = { ...state.presence };
      presences.forEach((p) => {
        updated[p.userId] = p;
      });
      return { presence: updated };
    }),

  removePresence: (userId) =>
    set((state) => {
      const updated = { ...state.presence };
      delete updated[userId];
      return { presence: updated };
    }),

  getPresence: (userId) => {
    return get().presence[userId] || null;
  },
}));
