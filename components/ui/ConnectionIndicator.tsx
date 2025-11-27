"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { wsClient } from "@/lib/wsClient";
import { cn } from "@/lib/utils/cn";

export default function ConnectionIndicator() {
  const [state, setState] = useState<
    "connected" | "connecting" | "disconnected"
  >(wsClient.isConnected ? "connected" : "disconnected");
  const [attempt, setAttempt] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Check connection status
    const checkConnection = () => {
      if (wsClient.isConnected) {
        setState("connected");
        // Hide indicator after 2 seconds when connected
        setTimeout(() => setShowIndicator(false), 2000);
      } else {
        setState("disconnected");
        setShowIndicator(true);
      }
    };

    const handleReconnecting = (data: any) => {
      setState("connecting");
      setAttempt(data.attempt);
      setShowIndicator(true);
    };

    const handleFailed = () => {
      setState("disconnected");
      setShowIndicator(true);
    };

    wsClient.on("connection:reconnecting", handleReconnecting);
    wsClient.on("connection:failed", handleFailed);

    const interval = setInterval(checkConnection, 1000);
    checkConnection();

    return () => {
      clearInterval(interval);
      wsClient.off("connection:reconnecting", handleReconnecting);
      wsClient.off("connection:failed", handleFailed);
    };
  }, []);

  const handleRetry = () => {
    setState("connecting");
    wsClient.connect().catch(() => {});
  };

  if (!showIndicator && state === "connected") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
          "px-4 py-2 rounded-full shadow-2xl flex items-center gap-3",
          "backdrop-blur-sm border",
          state === "connected" &&
            "bg-[#23a559]/20 border-[#23a559]/30 text-[#23a559]",
          state === "connecting" &&
            "bg-[#f0b232]/20 border-[#f0b232]/30 text-[#f0b232]",
          state === "disconnected" &&
            "bg-[#f23f43]/20 border-[#f23f43]/30 text-[#f23f43]"
        )}
      >
        {state === "connected" && (
          <>
            <Wifi size={16} />
            <span className="text-sm font-medium">Connected</span>
          </>
        )}

        {state === "connecting" && (
          <>
            <RefreshCw size={16} className="animate-spin" />
            <span className="text-sm font-medium">
              Reconnecting... (Attempt {attempt})
            </span>
          </>
        )}

        {state === "disconnected" && (
          <>
            <WifiOff size={16} />
            <span className="text-sm font-medium">Connection lost</span>
            <button
              onClick={handleRetry}
              className="ml-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium transition"
            >
              Retry
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
