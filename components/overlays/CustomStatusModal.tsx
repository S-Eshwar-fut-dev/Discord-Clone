"use client";

import React, { useState } from "react";
import Modal from "@/components/modals/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { usePresence } from "@/hooks/usePresence";
import { useSessionStore } from "@/store/session";

interface CustomStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomStatusModal({
  isOpen,
  onClose,
}: CustomStatusModalProps) {
  const { user } = useSessionStore();
  const { setStatus } = usePresence(); // Note: You might need to update usePresence to handle customStatus text if not already supported
  const [text, setText] = useState("");
  const [clearAfter, setClearAfter] = useState("today");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // In a real app, we need to pass this 'text' field to your backend/store
    // For now, we assume setStatus might handle it or we mock it
    console.log("Setting custom status:", text, "Clear after:", clearAfter);

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Set a Custom Status"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#b5bac1] uppercase">
            What's cookin', {user?.username}?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">
              🤔
            </span>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Support has arrived!"
              className="w-full pl-10 pr-3 py-2 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded-md outline-none focus:ring-1 focus:ring-[#00a8fc]"
              autoFocus
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-[#b5bac1] uppercase">
            Clear After
          </label>
          <select
            value={clearAfter}
            onChange={(e) => setClearAfter(e.target.value)}
            className="w-full px-3 py-2 bg-[#1e1f22] text-[#dbdee1] rounded-md outline-none border-none cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="4h">4 hours</option>
            <option value="1h">1 hour</option>
            <option value="30m">30 minutes</option>
            <option value="never">Don't clear</option>
          </select>
        </div>

        <div className="flex justify-end pt-4">
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
