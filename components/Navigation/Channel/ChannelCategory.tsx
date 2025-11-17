"use client";

export default function ChannelCategory({ name }: { name: string }) {
  return (
    <div className="px-3 mt-4 mb-1 text-[11px] uppercase tracking-wider text-gray-400">
      {name}
    </div>
  );
}
