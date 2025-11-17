"use client";

import Image from "next/image";

export default function GuildIcon({
  icon,
  unread,
  isHome,
  isAction,
}: {
  icon: string;
  unread?: boolean;
  isHome?: boolean;
  isAction?: boolean;
}) {
  return (
    <div className="relative group cursor-pointer">
      {unread && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#23a4ff] rounded-full" />
      )}

      <div
        className={`
          w-[48px] h-[48px] rounded-3xl overflow-hidden 
          flex items-center justify-center
          bg-[#2a2b2f]
          transition-all 
          group-hover:rounded-2xl 
          group-hover:bg-indigo-500
          ${isAction ? "bg-[#313338] text-white" : ""}
        `}
      >
        <Image
          src={icon}
          alt="server"
          width={40}
          height={40}
          className={`${isHome ? "opacity-80" : "rounded-full"} object-cover`}
        />
      </div>
    </div>
  );
}
