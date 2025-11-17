"use client";

import MessageListVirtual from "./MessageListVirtual";
import Composer from "./Composer";
import { ChatMessage } from "./MessageItem";

export default function ChatView({
  messages,
  onSend,
}: {
  messages: ChatMessage[];
  onSend: (msg: ChatMessage) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[#0f1113]">
      <div className="flex-1 overflow-hidden">
        <MessageListVirtual messages={messages} />
      </div>

      <div className="border-t border-[#232428] p-3 bg-[#111214]">
        <Composer onSend={onSend} />
      </div>
    </div>
  );
}
