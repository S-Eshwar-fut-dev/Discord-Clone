"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Users, Plus, Zap, Store, Search } from "lucide-react";
import DMItem from "./DMItem";
import { mockFriends, type Friend } from "@/components/mocks/mockFriends";
import { cn } from "@/lib/utils/cn";
import IconButton from "@/components/ui/IconButton";
import { useSessionStore } from "@/store/session";

export default function DMSidebar() {
  const router = useRouter();
  const params = useParams();
  const { user } = useSessionStore();
  const [searchQuery, setSearchQuery] = useState("");

  const activeDMId = params.userId as string;
  const isFriendsView = !activeDMId;

  // Filter friends based on search
  const filteredFriends = mockFriends.filter((f) =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFriendClick = (friend: Friend) => {
    router.push(`/channels/@me/${friend.id}`);
  };

  return (
    <aside className="h-full flex flex-col bg-[#2B2D31] w-full">
      {/* Search Bar */}
      <div className="p-2.5 border-b border-[#1F2023] shadow-sm">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#949BA4] pointer-events-none"
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find or start a conversation"
            className="w-full text-left bg-[#1E1F22] text-[#DBDEE1] placeholder-[#949BA4] text-xs font-medium pl-8 pr-2 py-1.5 rounded-sm hover:text-[#dbdee1] transition-colors outline-none focus:ring-0 truncate"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="px-2 pt-2 space-y-0.5">
        <NavButton
          icon={<Users size={20} />}
          label="Friends"
          isActive={isFriendsView}
          onClick={() => router.push("/channels/@me")}
        />
        <NavButton
          icon={<Zap size={20} />}
          label="Nitro"
          onClick={() => alert("Nitro feature coming soon!")}
        />
        <NavButton
          icon={<Store size={20} />}
          label="Shop"
          badge="NEW"
          onClick={() => alert("Shop feature coming soon!")}
        />
      </div>

      {/* Direct Messages Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1 group text-[#949BA4] hover:text-[#dbdee1] transition-colors">
        <span className="text-xs font-bold uppercase tracking-wide">
          Direct Messages
        </span>
        <PlusButton onClick={() => alert("Create DM group")} />
      </div>

      {/* DM List */}
      <div className="flex-1 overflow-y-auto custom-scroll px-2 space-y-0.5 pb-2">
        {filteredFriends.length === 0 ? (
          <div className="px-3 py-8 text-center text-sm text-[#87888c]">
            {searchQuery ? "No conversations found" : "No direct messages yet"}
          </div>
        ) : (
          filteredFriends.map((f) => (
            <DMItem
              key={f.id}
              friend={f}
              onClick={handleFriendClick}
              isActive={activeDMId === f.id}
              onClose={(friend) => {
                // Handle close DM
                console.log("Close DM:", friend.id);
              }}
            />
          ))
        )}
      </div>

      {/* User Profile Bar */}
      <div className="bg-[#232428] p-2 flex items-center gap-2 border-t border-[#1e1f22]">
        <div className="relative group cursor-pointer">
          <img
            src={user?.avatar || "/avatars/1.png"}
            className="w-8 h-8 rounded-full hover:opacity-90 transition-opacity"
            alt="Me"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a559] rounded-full border-2 border-[#232428]" />
        </div>
        <div className="flex-1 min-w-0 cursor-pointer">
          <div className="text-xs font-bold text-white truncate">
            {user?.username || "Eshwar S"}
          </div>
          <div className="text-[11px] text-[#b5bac1] truncate">Online</div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <IconButton
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 13.846 19.39 15.544 18.357 16.929L16.706 15.278C17.496 14.303 18 13.048 18 11.667C18 8.631 15.535 6.167 12.5 6.167C9.465 6.167 7 8.631 7 11.667C7 13.048 7.504 14.303 8.294 15.278L6.643 16.929C5.61 15.544 5 13.846 5 12C5 7.589 8.589 4 12 4Z" />
              </svg>
            }
            label="Voice Settings"
            size="sm"
            className="text-[#b5bac1] hover:text-[#dbdee1]"
          />
          <IconButton
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            }
            label="Settings"
            size="sm"
            className="text-[#b5bac1] hover:text-[#dbdee1]"
          />
        </div>
      </div>
    </aside>
  );
}

// NavButton Component
function NavButton({
  icon,
  label,
  isActive,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string;
  onClick?: () => void;
}) {
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
        <span className="bg-[#F23F43] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

// PlusButton Component
function PlusButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-white rounded"
      title="Create DM"
    >
      <Plus size={16} />
    </button>
  );
}
