"use client";

import React, { useState } from "react";
import { Plus, Image, Smile, Send } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface MobileComposerProps {
  onSend: (content: string) => void;
  placeholder?: string;
}

export default function MobileComposer({
  onSend,
  placeholder,
}: MobileComposerProps) {
  const [text, setText] = useState("");
  const [showActions, setShowActions] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="bg-[#2b2d31] p-3 border-t border-[#1e1f22]">
      {/* Actions Bar */}
      {showActions && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex gap-2 mb-3 overflow-x-auto pb-2"
        >
          <ActionButton icon={<Image size={20} />} label="Photo" />
          <ActionButton icon={<Smile size={20} />} label="Emoji" />
          <ActionButton icon={<Plus size={20} />} label="More" />
        </motion.div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <button
          onClick={() => setShowActions(!showActions)}
          className={cn(
            "p-2.5 rounded-full transition shrink-0",
            showActions
              ? "bg-[#5865f2] text-white"
              : "bg-[#383a40] text-[#b5bac1]"
          )}
        >
          <Plus size={20} />
        </button>

        <div className="flex-1 flex items-end gap-2 bg-[#383a40] rounded-full px-4 py-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder || "Message"}
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-[#87888c] outline-none resize-none max-h-[120px]"
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {text.trim() && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleSend}
              className="p-2 bg-[#5865f2] rounded-full text-white shrink-0"
            >
              <Send size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex flex-col items-center gap-1 px-4 py-2 bg-[#383a40] rounded-lg text-[#b5bac1] hover:text-white transition shrink-0">
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
