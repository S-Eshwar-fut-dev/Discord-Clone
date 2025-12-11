"use client";

import React, { useState } from "react";
import { Hash, Volume2, Lock, MessageSquare } from "lucide-react";
import Modal from "@/components/modals/Modal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    type: "text" | "voice";
    isPrivate: boolean;
  }) => void;
}

export default function CreateChannelModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"text" | "voice">("text");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit?.({ name, type, isPrivate });

    setLoading(false);
    setName("");
    setIsPrivate(false);
    setType("text");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Channel" size="md">
      <form onSubmit={handleSubmit} className="mt-2">
        {/* Channel Type Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase text-[#949ba4] mb-3 tracking-wide">
            Channel Type
          </label>

          <div className="space-y-2">
            <ChannelTypeOption
              id="text"
              label="Text"
              description="Send messages, images, GIFs, emoji, opinions, and puns"
              icon={<Hash className="w-6 h-6 text-[#b5bac1]" />}
              isSelected={type === "text"}
              onClick={() => setType("text")}
            />

            <ChannelTypeOption
              id="voice"
              label="Voice"
              description="Hang out together with voice, video, and screen share"
              icon={<Volume2 className="w-6 h-6 text-[#b5bac1]" />}
              isSelected={type === "voice"}
              onClick={() => setType("voice")}
            />
          </div>
        </div>

        {/* Channel Name Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase text-[#949ba4] mb-2 tracking-wide">
            Channel Name
          </label>
          <div className="flex items-center bg-[#1e1f22] rounded-md p-1 border border-transparent focus-within:ring-2 focus-within:ring-[#00a8fc]">
            <Hash size={20} className="text-[#949ba4] ml-2 mr-1 shrink-0" />
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value.replace(/\s+/g, "-").toLowerCase())
              }
              placeholder="new-channel"
              className="w-full bg-transparent text-[#dbdee1] placeholder-[#949ba4] px-2 py-1.5 text-[15px] outline-none font-medium h-10"
              autoFocus
              required
            />
          </div>
        </div>

        {/* Private Channel Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={24} className="text-[#b5bac1]" />
              <div>
                <div className="text-white font-medium text-[15px]">
                  Private Channel
                </div>
                <div className="text-xs text-[#949ba4]">
                  Only selected members and roles will be able to view this
                  channel.
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={cn(
                "w-10 h-6 rounded-full transition-colors relative ease-in-out duration-200",
                isPrivate ? "bg-[#23a559]" : "bg-[#80848e]"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                  isPrivate ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 bg-[#2b2d31] -mx-6 -mb-4 p-4 border-t border-[#1e1f22] rounded-b-lg">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="text-[#dbdee1] hover:underline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={!name}
            className="bg-[#5865f2] hover:bg-[#4752c4] px-6"
          >
            Create Channel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// --- Helper Component for the Options ---

function ChannelTypeOption({
  id,
  label,
  description,
  icon,
  isSelected,
  onClick,
}: {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors group",
        isSelected ? "bg-[#404249]" : "hover:bg-[#35373c]"
      )}
    >
      <div className="shrink-0 text-[#b5bac1]">{icon}</div>

      <div className="flex-1">
        <div
          className={cn(
            "font-medium text-[15px]",
            isSelected ? "text-white" : "text-[#dbdee1]"
          )}
        >
          {label}
        </div>
        <div className="text-xs text-[#949ba4] mt-0.5 leading-snug">
          {description}
        </div>
      </div>

      {/* Radio Button UI */}
      <div className="shrink-0">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            isSelected
              ? "border-[#dbdee1] bg-transparent" // In Discord's dark mode, active radio is often a simple circle or filled
              : "border-[#b5bac1] group-hover:border-[#dbdee1]"
          )}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#dbdee1]" />
          )}
        </div>
      </div>
    </div>
  );
}
