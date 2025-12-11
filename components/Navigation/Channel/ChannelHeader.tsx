"use client";

import { useState } from "react";
import {
  Hash,
  MessageSquare,
  Bell,
  BellOff,
  Bookmark,
  User,
  Search,
  MoreVertical,
  Settings,
  UserPlus,
  Volume2,
  VolumeX,
  Edit,
  Trash2,
  Copy,
  Pin,
} from "lucide-react";
import ChannelSearch from "./ChannelSearch";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export type Channel = {
  id: string;
  name: string;
  topic?: string | null;
  icon?: string;
  type?: "text" | "voice";
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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSetting, setNotificationSetting] = useState<
    "all" | "mentions" | "nothing" | "default"
  >("default");

  const handleNotificationChange = (
    setting: "all" | "mentions" | "nothing" | "default"
  ) => {
    setNotificationSetting(setting);
    setNotificationOpen(false);
  };

  return (
    <div className="border-b border-[#232428] bg-[#313338] relative z-10">
      <div className="max-w-full mx-0 px-4 py-3 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {channel.icon ? (
              <span className="text-xl shrink-0">{channel.icon}</span>
            ) : (
              <Hash className="text-[#80848e] w-6 h-6 shrink-0" />
            )}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-white text-base font-semibold truncate">
                  {channel.icon ? channel.name : `${channel.name}`}
                </h2>
              </div>

              {channel.topic && (
                <p className="text-xs text-[#949ba4] truncate max-w-[60ch]">
                  {channel.topic}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            aria-label="Threads"
            title="Threads"
            className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Notification Settings Dropdown */}
          <div className="relative">
            <button
              aria-label="Notification Settings"
              title="Notification Settings"
              onClick={() => setNotificationOpen(!notificationOpen)}
              className={cn(
                "text-[#b5bac1] hover:text-[#dbdee1] transition-colors",
                notificationOpen && "text-[#dbdee1]"
              )}
            >
              {notificationSetting === "nothing" ? (
                <BellOff className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {notificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setNotificationOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    w-60
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 top-full mt-2 w-60 bg-[#111214] rounded-md shadow-2xl border border-[#1e1f22] overflow-hidden z-40"
                  >
                    <div className="p-2">
                      <div className="px-2 py-1.5 mb-1">
                        <div className="text-xs font-semibold text-[#949ba4] uppercase">
                          Notification Settings
                        </div>
                      </div>

                      <button
                        onClick={() => handleNotificationChange("default")}
                        className={cn(
                          "w-full flex items-start gap-3 px-2 py-2 rounded hover:bg-[#4752c4] hover:text-white transition-colors group",
                          notificationSetting === "default" &&
                            "bg-[#4752c4] text-white"
                        )}
                      >
                        <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                          {notificationSetting === "default" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">
                            Use Category Default
                          </div>
                          <div className="text-xs text-[#b5bac1] group-hover:text-[#e3e5e8] mt-0.5">
                            All Messages
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNotificationChange("all")}
                        className={cn(
                          "w-full flex items-start gap-3 px-2 py-2 rounded hover:bg-[#4752c4] hover:text-white transition-colors group",
                          notificationSetting === "all" &&
                            "bg-[#4752c4] text-white"
                        )}
                      >
                        <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                          {notificationSetting === "all" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">
                            All Messages
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNotificationChange("mentions")}
                        className={cn(
                          "w-full flex items-start gap-3 px-2 py-2 rounded hover:bg-[#4752c4] hover:text-white transition-colors group",
                          notificationSetting === "mentions" &&
                            "bg-[#4752c4] text-white"
                        )}
                      >
                        <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                          {notificationSetting === "mentions" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">
                            Only @mentions
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNotificationChange("nothing")}
                        className={cn(
                          "w-full flex items-start gap-3 px-2 py-2 rounded hover:bg-[#4752c4] hover:text-white transition-colors group",
                          notificationSetting === "nothing" &&
                            "bg-[#4752c4] text-white"
                        )}
                      >
                        <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                          {notificationSetting === "nothing" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">Nothing</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            aria-label="Pinned messages"
            title="Pinned messages"
            className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
          >
            <Pin className="w-5 h-5" />
          </button>

          <button
            aria-label="Members"
            title="Members"
            onClick={() => onOpenMembers?.()}
            className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            aria-label="Search"
            title="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className={cn(
              "text-[#b5bac1] hover:text-[#dbdee1] transition-colors",
              searchOpen && "text-[#dbdee1]"
            )}
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 top-full mt-2 w-[220px] bg-[#111214] rounded-md shadow-2xl border border-[#1e1f22] overflow-hidden z-40"
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#dbdee1] hover:bg-[#4752c4] hover:text-white rounded transition-colors text-left">
                        <UserPlus className="w-4 h-4" />
                        Invite People
                      </button>
                      <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#dbdee1] hover:bg-[#4752c4] hover:text-white rounded transition-colors text-left">
                        <Edit className="w-4 h-4" />
                        Edit Channel
                      </button>
                      <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#dbdee1] hover:bg-[#4752c4] hover:text-white rounded transition-colors text-left">
                        <Copy className="w-4 h-4" />
                        Copy Channel Link
                      </button>

                      <div className="h-px bg-[#3f4147] my-1" />

                      <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#f23f43] hover:bg-[#f23f43] hover:text-white rounded transition-colors text-left">
                        <Trash2 className="w-4 h-4" />
                        Delete Channel
                      </button>
                    </div>
                  </motion.div>
                </>
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
            transition={{ duration: 0.15 }}
            className="border-t border-[#232428] bg-[#2b2d31] overflow-hidden"
          >
            <div className="p-4">
              <ChannelSearch onClose={() => setSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
