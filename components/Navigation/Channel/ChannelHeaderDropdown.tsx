// components/Navigation/Channel/ChannelHeaderDropdown.tsx
"use client";

import { Settings } from "lucide-react";

export default function ChannelHeaderDropdown({ onClose }: { onClose?: () => void }) {
  return (
    <div className="p-2 text-sm text-gray-200">
      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#212223] flex items-center gap-2">
        <Settings /> Channel Settings
      </button>

      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#212223] flex items-center gap-2">
        <span>Pin Channel</span>
      </button>

      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#212223] flex items-center gap-2 text-rose-400">
        Delete Channel
      </button>
    </div>
  );
}
