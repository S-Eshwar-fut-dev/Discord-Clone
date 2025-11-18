"use client";

import React from "react";
import {
  Hash,
  Users,
  Bell,
  Pin,
  Search,
  Inbox,
  HelpCircle,
} from "lucide-react";
import IconButton from "../ui/IconButton";

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
  return (
    <div className="h-12 flex items-center justify-between px-4 border-b border-[#26272b] bg-[#313338]">
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
      <div className="flex items-center gap-1">
        <IconButton icon={<Bell size={20} />} label="Mute channel" />
        <IconButton icon={<Pin size={20} />} label="Pinned messages" />
        <IconButton icon={<Users size={20} />} label="Members list" />
        <IconButton icon={<Search size={20} />} label="Search" />
        <IconButton icon={<Inbox size={20} />} label="Inbox" />
        <IconButton icon={<HelpCircle size={20} />} label="Help" />
      </div>
    </div>
  );
}
