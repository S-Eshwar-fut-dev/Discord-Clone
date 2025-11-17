// components/navigation/dms/mockFriends.ts
export type Friend = {
  id: string;
  username: string;
  tag?: string;
  avatar?: string | null;
  status: "online" | "idle" | "dnd" | "offline";
  lastMessage?: string;
  unread?: number;
};

export const mockFriends: Friend[] = [
  {
    id: "f1",
    username: "InnocentZERO",
    tag: "#0023",
    avatar: "/avatars/a2.png",
    status: "offline",
    lastMessage: "bruh",
    unread: 0,
  },
  {
    id: "f2",
    username: "KingDudeDS",
    tag: "#0099",
    avatar: "/avatars/a3.png",
    status: "offline",
    lastMessage: "yo",
    unread: 0,
  },
  {
    id: "f3",
    username: "Eshwar S",
    tag: "#0001",
    avatar: "/avatars/a1.png",
    status: "online",
    lastMessage: "welcome",
    unread: 1,
  },
];
