"use client";

import { ReactNode } from "react";

export default function ServerTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative group flex items-center justify-center">
      {children}

      <div
        className="
        invisible group-hover:visible 
        absolute left-[60px] 
        px-3 py-1 rounded-md 
        bg-black text-white text-xs 
        whitespace-nowrap 
        shadow-xl z-50
      "
      >
        {label}
      </div>
    </div>
  );
}
