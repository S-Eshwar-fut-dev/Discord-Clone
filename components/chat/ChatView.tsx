"use client";

import React from "react";
import MessageListVirtual from "./MessageListVirtual";
import Composer from "./Composer";
import ChannelHeader from "./ChannelHeader";
import type { ChatMessage } from "./MessageItem";

interface ChatViewProps {
  channelId?: string;
  channelName?: string;
  channelTopic?: string;
  messages: ChatMessage[];
  onSend: (message: ChatMessage) => void;
  unreadMessageId?: string | null;
}

export default function ChatView({
  channelId = "general",
  channelName = "general",
  channelTopic,
  messages,
  onSend,
  unreadMessageId,
}: ChatViewProps) {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Channel Header */}
      <ChannelHeader
        channelName={channelName}
        channelTopic={channelTopic}
        memberCount={0}
      />

      {/* Messages Area */}
      <div className="flex-1 min-h-0">
        <MessageListVirtual
          messages={messages}
          unreadMessageId={unreadMessageId}
        />
      </div>

      {/* Composer */}
      <Composer channelId={channelId} onSend={onSend} />
    </div>
  );
}
