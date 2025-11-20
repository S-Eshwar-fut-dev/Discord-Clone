// components/navigation/members/mockMembers.ts
export type Member = {
  id: string;
  username: string;
  avatar?: string | null;
  status: "online" | "idle" | "dnd" | "offline";
  role: string;
  tag?: string; // discriminator or short tag like #1234
};

export const mockMembers: Member[] = [
  {
    id: "1",
    username: "",
    avatar: "",
    status: "online",
    role: "Owner",
    tag: "#0001",
  },
  {
    id: "2",
    username: "",
    avatar:
      "http://googleusercontent.com/image_collection/image_retrieval/1273516072920196088_0",
    status: "offline",
    role: "Members",
    tag: "#0023",
  },
  {
    id: "3",
    username: "",
    avatar: "/avatars/a3.png",
    status: "offline",
    role: "Members",
    tag: "#0099",
  },
  {
    id: "4",
    username: "",
    avatar: "/avatars/a4.png",
    status: "idle",
    role: "Moderator",
    tag: "#0456",
  },
  {
    id: "5",
    username: "DevBot",
    avatar: null,
    status: "dnd",
    role: "Bot",
    tag: "",
  },
];
