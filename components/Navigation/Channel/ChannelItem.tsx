"use client";

import { cn } from "@/lib/cn";
import { Hash, Volume2 } from "lucide-react";

export default function ChannelItem({
  name,
  type,
  selected,
  onClick,
}: {
  name: string;
  type: "text" | "voice";
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-[#34363a]",
        selected ? "bg-[#393b40] text-white" : ""
      )}
    >
      {type === "text" ? (
        <Hash size={18} className="text-gray-400" />
      ) : (
        <Volume2 size={18} className="text-gray-400" />
      )}

      <span className="truncate">{name}</span>
    </button>
  );
}
