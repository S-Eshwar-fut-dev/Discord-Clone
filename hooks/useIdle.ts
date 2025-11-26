"use client";

import { useEffect, useRef } from "react";
import { usePresence } from "@/hooks/usePresence";
import { useSessionStore } from "@/store/session";

const IDLE_TIMEOUT = 5 * 60 * 1000;

export function useIdle() {
  const { user } = useSessionStore();
  const { setStatus, getPresence } = usePresence();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user) return;

    const handleActivity = () => {
      const current = getPresence(user.id);

      // If we were idle, switch back to online (unless manually set to DND)
      if (current?.status === "idle") {
        setStatus(user.id, "online");
      }

      // Reset timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        // Only auto-idle if currently online (don't override DND)
        const latest = getPresence(user.id);
        if (latest?.status === "online") {
          setStatus(user.id, "idle");
        }
      }, IDLE_TIMEOUT);
    };

    // Listen for events
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    // Init timer
    handleActivity();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user, setStatus, getPresence]);
}
