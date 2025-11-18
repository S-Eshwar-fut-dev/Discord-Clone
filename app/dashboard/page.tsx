"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import ChatView from "@/components/chat/ChatView";
import type { ChatMessage } from "@/components/chat/MessageItem";

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChannel] = useState("general");

  const handleSend = useCallback((m: ChatMessage) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  return (
    <div className="h-screen w-screen flex bg-[#313338] text-white overflow-hidden">
      {/* Guilds Rail - Fixed width, full height */}
      <div className="flex-none w-[72px] bg-[#1e1f22] border-r border-[#1e1f22]">
        <GuildsRail />
      </div>

      {/* Channels Sidebar - Fixed width, internal scroll */}
      <div className="flex-none w-60 bg-[#2b2d31] border-r border-[#1e1f22] flex flex-col min-h-0">
        <ChannelsColumn />
      </div>

      {/* Main Chat Area - Flexible, internal scroll */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-[#313338]">
        <ChatView
          channelId={currentChannel}
          messages={messages}
          onSend={handleSend}
        />
      </div>

      {/* Members Sidebar - Fixed width, internal scroll */}
      <div className="flex-none w-60 bg-[#2b2d31] border-l border-[#1e1f22] overflow-y-auto custom-scroll">
        <MembersSidebar />
      </div>
    </div>
  );
}
