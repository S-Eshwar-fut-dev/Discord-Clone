"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface MessageEditorProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
  onCancel: () => void;
  placeholder?: string;
}

/**
 * Inline message editor with Escape/Enter shortcuts
 */
export default function MessageEditor({
  initialContent,
  onSave,
  onCancel,
  placeholder = "Edit message",
}: MessageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus and select all on mount
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [content]);

  const handleSave = useCallback(async () => {
    const trimmed = content.trim();

    // Can't save empty message
    if (!trimmed) {
      setError("Message cannot be empty");
      return;
    }

    // No changes
    if (trimmed === initialContent.trim()) {
      onCancel();
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await onSave(trimmed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  }, [content, initialContent, onSave, onCancel]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Escape to cancel
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }

      // Enter to save (Shift+Enter for new line)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    },
    [onCancel, handleSave]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={saving}
          className={cn(
            "w-full px-3 py-2 bg-[#383a40] text-[#dbdee1] placeholder-[#87888c]",
            "rounded-md resize-none outline-none",
            "focus:ring-1 focus:ring-[#00a8fc]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          rows={1}
        />

        {/* Character count */}
        {content.length > 1900 && (
          <div className="absolute bottom-2 right-2 text-xs">
            <span
              className={cn(
                content.length > 2000 ? "text-[#f23f43]" : "text-[#949ba4]"
              )}
            >
              {content.length} / 2000
            </span>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-xs text-[#f23f43] flex items-center gap-1">
          <X size={12} />
          {error}
        </div>
      )}

      {/* Help text */}
      <div className="text-xs text-[#87888c]">
        Press <kbd className="px-1 py-0.5 bg-[#1e1f22] rounded">Escape</kbd> to{" "}
        <button
          onClick={onCancel}
          className="text-[#00a8fc] hover:underline"
          disabled={saving}
        >
          cancel
        </button>{" "}
        · Press <kbd className="px-1 py-0.5 bg-[#1e1f22] rounded">Enter</kbd> to{" "}
        <button
          onClick={handleSave}
          className="text-[#00a8fc] hover:underline"
          disabled={saving}
        >
          save
        </button>
      </div>
    </div>
  );
}
