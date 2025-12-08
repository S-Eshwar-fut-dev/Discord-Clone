"use client";

import { useState } from "react";
import {
  Hash,
  MessageSquare,
  Bell,
  Bookmark,
  User,
  Search,
  MoreVertical,
} from "lucide-react";
import ChannelSearch from "./ChannelSearch";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";
import { motion, AnimatePresence } from "framer-motion";

export type Channel = {
  id: string;
  name: string;
  topic?: string | null;
  icon?: string;
};

export default function ChannelHeader({
  guildName,
  channel,
  onOpenMembers,
}: {
  guildName: string;
  channel: Channel;
  onOpenMembers?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border-b border-[#232428] bg-[#0f1113]">
      <div className="max-w-full mx-0 px-6 py-3 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3">
            {channel.icon ? (
              <span className="text-xl">{channel.icon}</span>
            ) : (
              <Hash className="text-gray-300" />
            )}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-white text-lg font-semibold truncate">
                  {channel.icon ? channel.name : `#${channel.name}`}
                </h2>
                <span className="text-xs text-gray-400 px-2 py-1 rounded-md bg-[#171718] hidden sm:inline">
                  {guildName}
                </span>
              </div>

              {channel.topic ? (
                <p className="text-xs text-gray-400 truncate max-w-[60ch]">
                  {channel.topic}
                </p>
              ) : (
                <p className="text-xs text-gray-500 hidden sm:block">
                  No topic set for this channel
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Threads"
            title="Threads"
            className="p-2 rounded-md hover:bg-[#232427] transition"
          >
            <MessageSquare />
          </button>

          <button
            aria-label="Notifications"
            title="Notifications"
            className="p-2 rounded-md hover:bg-[#232427] transition"
          >
            <Bell />
          </button>

          <button
            aria-label="Pinned messages"
            title="Pinned messages"
            className="p-2 rounded-md hover:bg-[#232427] transition"
          >
            <Bookmark />
          </button>

          <button
            aria-label="Members"
            title="Members"
            onClick={() => onOpenMembers?.()}
            className="p-2 rounded-md hover:bg-[#232427] transition"
          >
            <User />
          </button>

          <button
            aria-label="Search"
            title="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className={`p-2 rounded-md hover:bg-[#232427] transition ${
              searchOpen ? "bg-[#232427]" : ""
            }`}
          >
            <Search />
          </button>

          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-[#232427] transition"
            >
              <MoreVertical />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-2 w-48 bg-[#171718] border border-[#27292b] rounded-md shadow-lg z-50"
                >
                  <ChannelHeaderDropdown onClose={() => setMenuOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[#232428] bg-[#0e0f10] p-4"
          >
            <ChannelSearch onClose={() => setSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
