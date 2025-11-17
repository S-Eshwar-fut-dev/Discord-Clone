"use client";

import { useState } from "react";
import ChannelItem from "./ChannelItem";
import ChannelCategory from "./ChannelCategory";
import { mockChannels } from "@/components/mocks/channels";

export default function ChannelsSidebar() {
  const [activeChannel, setActiveChannel] = useState("1");

  const grouped = mockChannels.reduce((acc: any, curr) => {
    acc[curr.category] = acc[curr.category] || [];
    acc[curr.category].push(curr);
    return acc;
  }, {});

  return (
    <div className="h-full w-full flex flex-col bg-[#2b2d31]">
      {/* SERVER HEADER */}
      <div className="p-4 text-base font-semibold bg-[#232428] flex items-center justify-between">
        Eoncord Server
      </div>

      {/* CHANNEL LIST */}
      <div className="flex-1 overflow-y-auto py-2">
        {Object.keys(grouped).map((category) => (
          <div key={category}>
            <ChannelCategory name={category} />

            {grouped[category].map((ch: any) => (
              <ChannelItem
                key={ch.id}
                name={ch.name}
                type={ch.type}
                selected={activeChannel === ch.id}
                onClick={() => setActiveChannel(ch.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
