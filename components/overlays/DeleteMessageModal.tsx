"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import type { ChatMessage } from "@/types/chat";

interface DeleteMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: ChatMessage;
  isLoading?: boolean;
}

export default function DeleteMessageModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  isLoading = false,
}: DeleteMessageModalProps) {
  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="w-full max-w-[440px] bg-[#313338] rounded-sm shadow-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header & Body */}
        <div className="p-4 pb-0">
          <h2 className="text-xl font-bold text-[#f2f3f5] mb-4">
            Delete Message
          </h2>

          <p className="text-[#dbdee1] mb-4 leading-snug">
            Are you sure you want to delete this message? This cannot be undone.
          </p>

          {/* Message Preview Box */}
          {message && (
            <div className="bg-[#2b2d31] border border-none rounded shadow-sm p-3 mb-4 flex gap-3 overflow-hidden">
              {/* Author Avatar Preview */}
              <div className="shrink-0 mt-1">
                {message.author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={message.author.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full bg-gray-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#5865f2]" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-white text-sm">
                    {message.author.username}
                  </span>
                  <span className="text-[10px] text-[#949ba4]">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-[#dbdee1] text-sm mt-0.5 truncate opacity-90">
                  {message.content}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="bg-[#2b2d31] p-4 flex justify-end gap-4 items-center mt-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-[#f2f3f5] text-sm hover:underline px-2 py-1 transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "bg-[#da373c] hover:bg-[#a1282c] text-white px-5 py-2.5 rounded-[3px] text-sm font-medium transition-colors",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
