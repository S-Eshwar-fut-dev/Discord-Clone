"use client";

import { useState } from "react";

// GUILDS NAV
import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import ChatView from "@/components/chat/ChatView";
import type { ChatMessage } from "@/components/chat/MessageItem";

export default function DashboardPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="min-h-screen flex bg-[#0c0d0e] text-white">
      <div className="flex-none">
        <GuildsRail />
      </div>

      <div className="flex-1 flex">
        <div className="w-80 border-r border-[#202225] bg-[#1a1b1e]">
          <ChannelsColumn />
        </div>

        <div className="flex-1 bg-[#0f1113]">
          <ChatView
            messages={messages}
            onSend={(m) => setMessages((prev) => [...prev, m])}
          />
        </div>
      </div>

      <div className="w-80 border-l border-[#202225] bg-[#1a1b1e]">
        <MembersSidebar />
      </div>
    </div>
  );
}
