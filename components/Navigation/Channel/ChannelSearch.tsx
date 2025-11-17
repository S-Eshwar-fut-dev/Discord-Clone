"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useDebounce } from "@/lib/hooks";

export default function ChannelSearch({ onClose }: { onClose?: () => void }) {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 250);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }

    // MOCK search — replace with API later
    const r = [
      `Result for "${debounced}" #1`,
      `Result for "${debounced}" #2`,
      `Result for "${debounced}" #3`,
    ];
    setResults(r);
  }, [debounced]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-full"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search />
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            placeholder="Search in #general"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#141516] text-white placeholder-gray-500 outline-none ring-1 ring-[#1f2022] focus:ring-indigo-500"
          />
        </div>

        <button
          className="px-3 py-2 rounded-md bg-[#232427] hover:bg-[#2b2d31]"
          onClick={() => onClose?.()}
        >
          Close
        </button>
      </div>

      <div className="mt-3">
        {results.length === 0 ? (
          <div className="text-sm text-gray-400">No results</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {results.map((r, i) => (
              <li key={i} className="px-3 py-2 rounded-md hover:bg-[#1b1c1e]">
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
