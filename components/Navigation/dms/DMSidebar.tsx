"use client";

import React, { useEffect, useMemo, useState } from "react";
import { UserPlus, Users, Store, Zap, ScrollText } from "lucide-react";
import DMItem from "./DMItem";
import { mockFriends, type Friend } from "@/components/mocks/mockFriends";
import { useFriendsStore } from "@/store/friends";
import { cn } from "@/lib/utils/cn";

interface DMSidebarProps {
  onOpenDM?: (f: Friend) => void;
}

export default function DMSidebar({ onOpenDM }: DMSidebarProps) {
  const { friends, setFriends } = useFriendsStore();
  const [activeDmId, setActiveDmId] = useState<string | null>(null);

  useEffect(() => {
    setFriends(mockFriends);
  }, [setFriends]);

  const handleOpenDM = (friend: Friend) => {
    setActiveDmId(friend.id);
    onOpenDM?.(friend);
  };

  return (
    <aside className="h-full flex flex-col bg-[#2b2d31] overflow-hidden w-60">
      {/* Top Search Button */}
      <div className="flex-none px-2.5 py-2.5 border-b border-[#1e1f22] shadow-sm z-10">
        <button className="w-full text-left bg-[#1e1f22] text-[#949ba4] text-sm px-2 py-1.5 rounded-sm hover:text-[#dbdee1] transition-colors truncate">
          Find or start a conversation
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto custom-scroll px-2 pt-2">
        {/* Friends */}
        <SidebarButton
          icon={<Users size={20} />}
          label="Friends"
          active={!activeDmId} // Active if no specific DM is open
          onClick={() => setActiveDmId(null)} // Switch to Friends View
        />

        {/* Premium Features (Visual Only) */}
        <SidebarButton icon={<Zap size={20} />} label="Nitro" />
        <SidebarButton icon={<Store size={20} />} label="Shop" badge="NEW" />
        <SidebarButton icon={<ScrollText size={20} />} label="Quests" />

        {/* DM List Header */}
        <div className="flex items-center justify-between mt-4 mb-1 px-2 group">
          <h2 className="text-xs font-bold text-[#949ba4] uppercase hover:text-[#dbdee1] transition-colors cursor-pointer">
            Direct Messages
          </h2>
          <button
            className="text-[#dbdee1] opacity-0 group-hover:opacity-100 transition-opacity"
            title="Create DM"
          >
            <UserPlus size={16} />
          </button>
        </div>

        {/* DM List */}
        <div className="space-y-px">
          {friends.map((f) => (
            <DMItem
              key={f.id}
              friend={f}
              onClick={handleOpenDM}
              isActive={activeDmId === f.id}
            />
          ))}
        </div>
      </div>

      {/* User Profile Bar will be rendered by the parent layout */}
    </aside>
  );
}

// Helper Component for Sidebar Buttons
function SidebarButton({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full flex items-center justify-between px-3 py-2.5 rounded-sm mb-0.5 transition-colors",
        active
          ? "bg-[#404249] text-white"
          : "text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn("shrink-0", active ? "text-white" : "text-[#949ba4]")}
        >
          {icon}
        </div>
        <span className="font-medium text-sm">{label}</span>
      </div>

      {badge && (
        <span className="bg-[#f23f43] text-white text-[10px] font-bold px-1.5 rounded-sm">
          {badge}
        </span>
      )}
    </button>
  );
}
