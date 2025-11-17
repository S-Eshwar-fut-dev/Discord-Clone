"use client";

import { useState } from "react";
import { ChatMessage } from "./MessageItem";
import { v4 as uuidv4 } from "uuid";

export default function Composer({
  onSend,
}: {
  onSend: (msg: ChatMessage) => void;
}) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: uuidv4(),
      author: {
        id: "me",
        username: "You",
        avatar: null,
      },
      content: text.trim(),
      channelId: "general",
      createdAt: new Date().toISOString(),
      temp: false,
    };

    onSend(newMessage);
    setText("");
  };

  return (
    <div className="flex items-center gap-2 bg-[#1a1b1e] p-3 rounded-md">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Message #general"
        className="flex-1 bg-[#111214] text-white px-3 py-2 rounded-md outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md"
      >
        Send
      </button>
    </div>
  );
}
