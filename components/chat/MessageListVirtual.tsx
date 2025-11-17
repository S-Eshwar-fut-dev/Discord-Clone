"use client";

import { Virtuoso } from "react-virtuoso";
import MessageItem, { ChatMessage } from "./MessageItem";

export default function MessageListVirtual({
  messages,
}: {
  messages: ChatMessage[];
}) {
  return (
    <div className="h-full w-full">
      <Virtuoso
        data={messages}
        followOutput="auto"
        itemContent={(index, message) => (
          <div className="px-4 py-2">
            <MessageItem message={message} />
          </div>
        )}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
