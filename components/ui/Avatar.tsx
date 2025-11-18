"use client";

import React from "react";
import { cn } from "@/lib/cn";
import PresenceBadge, { type PresenceStatus } from "./PresenceBadge";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  status?: PresenceStatus | null;
  className?: string;
  fallback?: string;
}

export default function Avatar({
  src,
  alt = "avatar",
  size = 40,
  status = null,
  className = "",
  fallback,
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const initials = fallback || alt.substring(0, 2).toUpperCase();

  return (
    <div
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full rounded-full object-cover"
          draggable={false}
          onError={() => setError(true)}
        />
      ) : (
        <div
          className="w-full h-full rounded-full flex items-center justify-center bg-[#5865f2] text-white font-semibold"
          style={{ fontSize: size / 2.5 }}
        >
          {initials}
        </div>
      )}

      {status && (
        <div className="absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5">
          <PresenceBadge status={status} size={size > 32 ? "md" : "sm"} />
        </div>
      )}
    </div>
  );
}
