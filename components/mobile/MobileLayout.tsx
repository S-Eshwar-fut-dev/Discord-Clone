"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hash, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import GuildsRail from "@/components/Navigation/Guild/GuildsRail";
import ChannelsColumn from "@/components/Navigation/Channel/ChannelsColumn";
import MembersSidebar from "@/components/Navigation/Members/MembersSidebar";
import { cn } from "@/lib/utils/cn";

interface MobileLayoutProps {
  children: React.ReactNode;
  guildId?: string;
  guildName?: string;
}

export default function MobileLayout({
  children,
  guildId,
  guildName,
}: MobileLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebars on route change
  useEffect(() => {
    setShowSidebar(false);
    setShowMembers(false);
  }, [pathname]);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#313338] overflow-hidden">
      {/* Mobile Header */}
      <div className="h-14 flex items-center justify-between px-4 bg-[#2b2d31] border-b border-[#1e1f22] shrink-0">
        <button
          onClick={() => setShowSidebar(true)}
          className="p-2 hover:bg-[#35373c] rounded transition"
        >
          <Menu size={24} className="text-[#b5bac1]" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <Hash size={20} className="text-[#87888c] shrink-0" />
          <span className="text-white font-semibold truncate">
            {guildName || "general"}
          </span>
        </div>

        <button
          onClick={() => setShowMembers(true)}
          className="p-2 hover:bg-[#35373c] rounded transition"
        >
          <Users size={24} className="text-[#b5bac1]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-[280px] z-50 flex"
            >
              {/* Guilds Rail */}
              <div className="w-[72px] shrink-0">
                <GuildsRail activeGuildId={guildId} />
              </div>

              {/* Channels */}
              <div className="flex-1 bg-[#2b2d31]">
                <div className="h-14 flex items-center justify-between px-4 border-b border-[#1e1f22]">
                  <span className="text-white font-semibold">Channels</span>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-1 hover:bg-[#35373c] rounded"
                  >
                    <X size={20} className="text-[#b5bac1]" />
                  </button>
                </div>
                {guildId && guildName && (
                  <ChannelsColumn guildId={guildId} guildName={guildName} />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Members Drawer */}
      <AnimatePresence>
        {showMembers && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMembers(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-[280px] bg-[#2b2d31] z-50"
            >
              <div className="h-14 flex items-center justify-between px-4 border-b border-[#1e1f22]">
                <span className="text-white font-semibold">Members</span>
                <button
                  onClick={() => setShowMembers(false)}
                  className="p-1 hover:bg-[#35373c] rounded"
                >
                  <X size={20} className="text-[#b5bac1]" />
                </button>
              </div>
              <MembersSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
