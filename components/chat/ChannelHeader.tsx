"use client";

import React, { useState } from "react";
import {
  Hash,
  Users,
  Bell,
  Pin,
  Search,
  Inbox,
  HelpCircle,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import IconButton from "../ui/IconButton";
import InboxPopover from "../overlays/InboxPopover";
import { useNotifications } from "@/hooks/useNotifications";
import { useNotificationStore } from "@/store/notifications";

interface ChannelHeaderProps {
  channelName: string;
  channelTopic?: string;
  memberCount?: number;
}

export default function ChannelHeader({
  channelName,
  channelTopic,
  memberCount,
}: ChannelHeaderProps) {
  const [showInbox, setShowInbox] = useState(false);

  // Initialize notification listener
  useNotifications();

  // Get unread count from store
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <div className="relative h-12 flex items-center justify-between px-4 border-b border-[#26272b] bg-[#313338] z-20">
      {/* Left - Channel info */}
      <div className="flex items-center gap-2 min-w-0">
        <Hash size={20} className="text-[#80848e] shrink-0" />
        <h2 className="font-semibold text-white">{channelName}</h2>
        {channelTopic && (
          <>
            <div className="w-px h-5 bg-[#3f4147]" />
            <p className="text-sm text-[#949ba4] truncate">{channelTopic}</p>
          </>
        )}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1 relative">
        <IconButton icon={<Bell size={20} />} label="Mute channel" />
        <IconButton icon={<Pin size={20} />} label="Pinned messages" />
        <IconButton icon={<Users size={20} />} label="Members list" />
        <IconButton icon={<Search size={20} />} label="Search" />

        {/* Inbox Button with Badge */}
        <div className="relative">
          <IconButton
            icon={<Inbox size={20} />}
            label="Inbox"
            onClick={() => setShowInbox(!showInbox)}
            className={showInbox ? "text-white bg-[#3f4147]" : ""}
          />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#f23f43] rounded-full border-2 border-[#313338]" />
          )}
        </div>

        <IconButton icon={<HelpCircle size={20} />} label="Help" />
      </div>

      {/* Inbox Popover */}
      <AnimatePresence>
        {showInbox && <InboxPopover onClose={() => setShowInbox(false)} />}
      </AnimatePresence>
    </div>
  );
}
