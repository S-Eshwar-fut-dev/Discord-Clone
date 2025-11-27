"use client";

import React, { useState } from "react";
import { UserPlus, Users, Zap, Store, Truck } from "lucide-react"; // Truck used as placeholder for Nitro/Quests
import DMItem from "./DMItem";
import { mockFriends, type Friend } from "@/components/mocks/mockFriends";
import { cn } from "@/lib/utils/cn";

interface DMSidebarProps {
  onOpenDM?: (f: Friend) => void;
}

export default function DMSidebar({ onOpenDM }: DMSidebarProps) {
  const [activeId, setActiveId] = useState("friends");

  return (
    <aside className="h-full flex flex-col bg-[#2B2D31] w-full">
      {/* 1. Search Bar */}
      <div className="p-2.5 border-b border-[#1F2023] shadow-sm">
        <button className="w-full text-left bg-[#1E1F22] text-[#949BA4] text-xs font-medium px-2 py-1.5 rounded-sm hover:text-[#dbdee1] transition-colors truncate">
          Find or start a conversation
        </button>
      </div>

      {/* 2. Navigation Items (Nitro, Shop, etc) */}
      <div className="px-2 pt-2 space-y-0.5">
        <NavButton
          icon={<Users size={20} />}
          label="Friends"
          isActive={activeId === "friends"}
          onClick={() => setActiveId("friends")}
        />
        <NavButton icon={<Zap size={20} />} label="Nitro" />
        <NavButton icon={<Store size={20} />} label="Shop" badge="NEW" />
      </div>

      {/* 3. Direct Messages Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1 group text-[#949BA4] hover:text-[#dbdee1] cursor-pointer">
        <span className="text-xs font-bold uppercase tracking-wide">
          Direct Messages
        </span>
        <PlusButton />
      </div>

      {/* 4. DM List */}
      <div className="flex-1 overflow-y-auto custom-scroll px-2 space-y-0.5 pb-2">
        {mockFriends.map((f) => (
          <DMItem
            key={f.id}
            friend={f}
            onClick={(friend) => {
              setActiveId(friend.id);
              onOpenDM?.(friend);
            }}
            isActive={activeId === f.id}
          />
        ))}
      </div>

      {/* 5. User Profile Bar (Sticky Bottom) */}
      <div className="bg-[#232428] p-2 flex items-center gap-2">
        <div className="relative group cursor-pointer">
          <img
            src="/avatars/1.png"
            className="w-8 h-8 rounded-full hover:opacity-90"
            alt="Me"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a559] rounded-full border-2 border-[#232428]" />
        </div>
        <div className="flex-1 min-w-0 cursor-pointer">
          <div className="text-xs font-bold text-white truncate">Eshwar S</div>
          <div className="text-[11px] text-[#dbdee1] truncate">Online</div>
        </div>
        {/* Icons for Mic/Deafen/Settings would go here */}
      </div>
    </aside>
  );
}

// -- Small Components for this file --

function NavButton({ icon, label, isActive, badge, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-sm group transition-all",
        isActive
          ? "bg-[#404249] text-white"
          : "text-[#949BA4] hover:bg-[#35373C] hover:text-[#dbdee1]"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-[15px]">{label}</span>
      </div>
      {badge && (
        <span className="bg-[#F23F43] text-white text-[10px] font-bold px-1.5 rounded-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

function PlusButton() {
  return (
    <svg
      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 11H21V13H13V21H11V13H3V11H11V3H13V11Z"
      />
    </svg>
  );
}
