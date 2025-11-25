"use client";

import { create } from "zustand";

export interface VoiceParticipant {
  id: string;
  username: string;
  avatar?: string | null;
  speaking: boolean;
  muted: boolean;
  deafened: boolean;
}

interface VoiceState {
  currentChannelId: string | null;
  participants: VoiceParticipant[];
  isMuted: boolean;
  isDeafened: boolean;

  joinChannel: (channelId: string) => void;
  leaveChannel: () => void;
  toggleMute: () => void;
  toggleDeafen: () => void;
  simulateSpeaking: () => void;
}

// Mock users for demo
const MOCK_PARTICIPANTS: VoiceParticipant[] = [
  {
    id: "u1",
    username: "Eshwar",
    avatar: "/avatars/1.png",
    speaking: false,
    muted: false,
    deafened: false,
  },
  {
    id: "u2",
    username: "InnocentZero",
    avatar: "/avatars/2.png",
    speaking: true,
    muted: false,
    deafened: false,
  },
  {
    id: "u3",
    username: "KingDudeDS",
    avatar: "/avatars/3.png",
    speaking: false,
    muted: true,
    deafened: false,
  },
];

export const useVoiceStore = create<VoiceState>((set, get) => ({
  currentChannelId: null,
  participants: [],
  isMuted: false,
  isDeafened: false,

  joinChannel: (channelId) => {
    set({
      currentChannelId: channelId,
      participants: MOCK_PARTICIPANTS, // Load mock users when joining
    });
  },

  leaveChannel: () => {
    set({ currentChannelId: null, participants: [] });
  },

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleDeafen: () => set((state) => ({ isDeafened: !state.isDeafened })),

  simulateSpeaking: () => {
    set((state) => {
      const newParticipants = state.participants.map((p) => ({
        ...p,
        speaking: Math.random() > 0.7, // 30% chance to be speaking
      }));
      return { participants: newParticipants };
    });
  },
}));
export function useVoice() {
  return useVoiceStore();
}
