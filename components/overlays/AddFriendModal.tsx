// components/overlays/AddFriendModal.tsx
"use client";

import { useState } from "react";
import { useFriendsStore } from "@/store/friends";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

export default function AddFriendModal({ onClose }: { onClose?: () => void }) {
  const [q, setQ] = useState("");
  const addFriend = useFriendsStore((s) => s.addFriend);

  function handleAdd() {
    const username = q.trim();
    if (!username) return;
    const newFriend = {
      id: uuidv4(),
      username,
      tag: `#${Math.floor(Math.random() * 9000 + 1000)}`,
      avatar: null,
      status: "offline" as const,
      lastMessage: "",
      unread: 0,
    };
    addFriend(newFriend);
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ scale: 0.985, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[420px] bg-[#161617] rounded-md p-5 shadow-lg border border-[#27292b]"
      >
        <h3 className="text-lg font-semibold text-white mb-3">Add a friend</h3>
        <p className="text-sm text-gray-400 mb-4">
          Enter their username (example: Eshwar#0001)
        </p>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Username#1234"
          className="w-full px-3 py-2 rounded-md bg-[#0f1113] text-white outline-none ring-1 ring-[#1f2022]"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => onClose?.()}
            className="px-3 py-2 rounded-md hover:bg-[#232427]"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-3 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Send Request
          </button>
        </div>
      </motion.div>
    </div>
  );
}
