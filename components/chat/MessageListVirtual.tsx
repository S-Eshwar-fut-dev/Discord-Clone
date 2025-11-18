"use client";

import React, { useRef, useState, useEffect } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import MessageItem, { type ChatMessage } from "./MessageItem";
import DaySeparator from "./DaySeparator";
import UnreadMarker from "./UnreadMarker";
import {
  shouldGroupMessages,
  shouldShowDaySeparator,
  getDaySeparator,
} from "@/lib/utils/messageGrouping";
import { cn } from "@/lib/cn";

interface MessageListVirtualProps {
  messages: ChatMessage[];
  unreadMessageId?: string | null;
}

type ListItem =
  | { type: "day"; id: string; label: string }
  | { type: "unread"; id: string }
  | { type: "message"; message: ChatMessage; isFirstInGroup: boolean };

export default function MessageListVirtual({
  messages,
  unreadMessageId,
}: MessageListVirtualProps) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [hasTopShadow, setHasTopShadow] = useState(false);

  // Build list items with day separators and grouping
  const listItems: ListItem[] = React.useMemo(() => {
    const items: ListItem[] = [];

    messages.forEach((message, idx) => {
      const prevMessage = idx > 0 ? messages[idx - 1] : undefined;

      // Day separator
      if (shouldShowDaySeparator(message, prevMessage)) {
        items.push({
          type: "day",
          id: `day-${message.id}`,
          label: getDaySeparator(message.createdAt),
        });
      }

      // Unread marker
      if (unreadMessageId && message.id === unreadMessageId) {
        items.push({
          type: "unread",
          id: `unread-${message.id}`,
        });
      }

      // Message
      items.push({
        type: "message",
        message,
        isFirstInGroup: !shouldGroupMessages(message, prevMessage),
      });
    });

    return items;
  }, [messages, unreadMessageId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (atBottom && messages.length > 0) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index: listItems.length - 1,
          align: "end",
          behavior: "smooth",
        });
      }, 100);
    }
  }, [messages.length, atBottom, listItems.length]);

  return (
    <div className="relative h-full w-full">
      <Virtuoso
        ref={virtuosoRef}
        data={listItems}
        className={cn(
          "h-full w-full",
          hasTopShadow && "scroll-shadow-top has-scroll"
        )}
        followOutput="smooth"
        alignToBottom
        atBottomStateChange={setAtBottom}
        atTopStateChange={(isAtTop) => setHasTopShadow(!isAtTop)}
        itemContent={(index, item) => {
          if (item.type === "day") {
            return <DaySeparator label={item.label} />;
          }

          if (item.type === "unread") {
            return <UnreadMarker />;
          }

          return (
            <MessageItem
              message={item.message}
              isFirstInGroup={item.isFirstInGroup}
            />
          );
        }}
        components={{
          Scroller: React.forwardRef((props, ref) => (
            <div {...props} ref={ref} className="custom-scroll" />
          )),
        }}
      />
    </div>
  );
}
