// components/ui/Avatar.tsx
"use client";

import React from "react";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number; // px
  status?: "online" | "idle" | "dnd" | "offline" | null;
  className?: string;
};

export default function Avatar({
  src,
  alt = "avatar",
  size = 40,
  status = null,
  className = "",
}: AvatarProps) {
  const statusColor =
    status === "online"
      ? "bg-green-400"
      : status === "idle"
      ? "bg-yellow-400"
      : status === "dnd"
      ? "bg-rose-500"
      : "bg-gray-600";

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src ?? "/avatars/1.png"}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover w-full h-full"
        draggable={false}
      />
      {status && (
        <span
          aria-hidden="true"
          className={`absolute bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-black ${statusColor}`}
        />
      )}
    </div>
  );
}
