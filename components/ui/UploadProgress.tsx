"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface UploadProgressProps {
  filename: string;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
  onCancel?: () => void;
}

export default function UploadProgress({
  filename,
  progress,
  status,
  error,
  onCancel,
}: UploadProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex items-center gap-3 p-3 bg-[#2b2d31] rounded-lg border border-[#3f4147]"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {status === "success" ? (
          <CheckCircle size={20} className="text-[#23a55a]" />
        ) : status === "error" ? (
          <AlertCircle size={20} className="text-[#f23f43]" />
        ) : (
          <div className="relative w-5 h-5">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-[#3f4147]"
              />
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 8}`}
                strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                className="text-[#5865f2] transition-all"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#dbdee1] truncate">{filename}</p>
        {status === "error" && error ? (
          <p className="text-xs text-[#f23f43]">{error}</p>
        ) : (
          <p className="text-xs text-[#87888c]">
            {status === "success" ? "Upload complete" : `${progress}% uploaded`}
          </p>
        )}
      </div>

      {/* Actions */}
      {status === "uploading" && onCancel && (
        <button
          onClick={onCancel}
          className="flex-shrink-0 p-1 hover:bg-[#3f4147] rounded transition-colors"
        >
          <X size={16} className="text-[#b5bac1]" />
        </button>
      )}
    </motion.div>
  );
}
