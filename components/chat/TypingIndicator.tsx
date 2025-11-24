"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTyping } from "@/hooks/useTyping";

export default function TypingIndicator({ channelId }: { channelId: string }) {
  const { activeTypingUsers } = useTyping(channelId);

  if (activeTypingUsers.length === 0) return null;

  // Generate text (e.g. "Eshwar is typing..." or "Eshwar, John and 2 others...")
  const text = (() => {
    const count = activeTypingUsers.length;
    const u1 = activeTypingUsers[0].username;

    if (count === 1) return <span className="font-bold">{u1}</span>;

    const u2 = activeTypingUsers[1].username;
    if (count === 2)
      return (
        <span>
          <span className="font-bold">{u1}</span> and{" "}
          <span className="font-bold">{u2}</span>
        </span>
      );

    const u3 = activeTypingUsers[2].username;
    if (count === 3)
      return (
        <span>
          <span className="font-bold">{u1}</span>,{" "}
          <span className="font-bold">{u2}</span> and{" "}
          <span className="font-bold">{u3}</span>
        </span>
      );

    return <span className="font-bold">Several people</span>;
  })();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-full left-0 px-4 py-1 flex items-center gap-1.5 pointer-events-none h-6 mb-1"
      >
        <div className="flex gap-0.5 pt-1">
          <motion.span
            className="w-1.5 h-1.5 bg-[#dbdee1] rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-1.5 h-1.5 bg-[#dbdee1] rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-1.5 h-1.5 bg-[#dbdee1] rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <div className="text-xs font-medium text-[#dbdee1] leading-none">
          {text} is typing...
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
