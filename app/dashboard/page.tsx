"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import ChatView from "@/components/chat/ChatView";
import type { ChatMessage } from "@/types/chat";
import { useWebSocket } from "@/services/ws/useMockWebSocket";
import { fetchMessages } from "@/services/api/messages";
import { v4 as uuidv4 } from "uuid";

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChannel] = useState("c-general");
  const [loading, setLoading] = useState(true);

  // Load initial messages
  useEffect(() => {
    async function loadMessages() {
      try {
        setLoading(true);
        const response = await fetchMessages(currentChannel, 50);
        setMessages(response.items);
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [currentChannel]);

  // WebSocket connection
  const handleNewMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => {
      // Replace optimistic message if tempId matches
      if (msg.tempId) {
        const idx = prev.findIndex((m) => m.tempId === msg.tempId);
        if (idx !== -1) {
          const copy = [...prev];
          copy[idx] = msg;
          return copy;
        }
      }
      return [...prev, msg];
    });
  }, []);

  const { sendCreateMessage } = useWebSocket(currentChannel, handleNewMessage);

  /**
   * onSend must match ChatView's expected signature: (content: string) => Promise<void>
   * We create an optimistic ChatMessage, push it to state, then send over WS.
   */
  const handleSend = useCallback(
    async (content: string) => {
      if (!content || !content.trim()) return;

      const tempId = uuidv4();

      // You should replace this with real user data from your auth system
      const author = {
        id: "me",
        username: "You",
        discriminator: "0001",
        avatar: null,
      };

      const optimistic: ChatMessage = {
        id: tempId, // temporary id until server assigns real id
        tempId,
        channelId: currentChannel,
        author,
        content,
        attachments: [],
        createdAt: new Date().toISOString(),
        editedAt: null,
        // optional flag can be honored by MessageItem to show "sending" UI
        // @ts-ignore
        temp: true,
      };

      // Insert optimistic message
      setMessages((prev) => [...prev, optimistic]);

      // Send via WS (sendCreateMessage should handle sending obj matching mock server)
      try {
        await sendCreateMessage({
          channelId: optimistic.channelId,
          content: optimistic.content,
          authorId: optimistic.author.id,
          tempId: optimistic.tempId,
          attachments: optimistic.attachments,
        });
        // success: server should broadcast message:created which will replace optimistic via handleNewMessage
      } catch (err) {
        console.error(
          "WS send failed, you may want to fallback to POST /api/messages",
          err
        );
        // mark message as failed (so UI can show retry)
        setMessages((prev) =>
          prev.map((m) =>
            m.tempId === tempId
              ? ({ ...m, temp: false, status: "failed" } as ChatMessage)
              : m
          )
        );
      }
    },
    [currentChannel, sendCreateMessage]
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#313338] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#313338] text-white overflow-hidden">
      {/* Guilds Rail */}
      <div className="flex-none w-[72px] bg-[#1e1f22] border-r border-[#1e1f22]">
        <GuildsRail />
      </div>

      {/* Channels Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31] border-r border-[#1e1f22] flex flex-col min-h-0">
        <ChannelsColumn />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-[#313338]">
        <ChatView
          channelId={currentChannel}
          messages={messages}
          onSend={handleSend}
        />
      </div>

      {/* Members Sidebar */}
      <div className="flex-none w-60 bg-[#2b2d31] border-l border-[#1e1f22] overflow-y-auto custom-scroll">
        <MembersSidebar />
      </div>
    </div>
  );
}
