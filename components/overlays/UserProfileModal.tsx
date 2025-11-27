"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Clock,
  Shield,
  MessageSquare,
  UserPlus,
  MoreHorizontal,
  Flag,
  X,
} from "lucide-react";
import Modal from "@/components/modals/Modal";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import type { Member } from "@/components/mocks/mockMembers";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  member,
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "mutual" | "notes">(
    "profile"
  );

  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" showClose={false}>
      <div className="flex">
        {/* Left Side - Banner & Avatar */}
        <div className="w-[300px] shrink-0 bg-[#1e1f22] relative">
          {/* Banner */}
          <div className="h-[120px] bg-linear-to-br from-[#5865f2] to-[#7289da] relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, #5865f2 0%, #7289da 100%)",
                  "linear-gradient(135deg, #7289da 0%, #5865f2 100%)",
                  "linear-gradient(135deg, #5865f2 0%, #7289da 100%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          {/* Avatar */}
          <div className="px-4 pb-4">
            <div className="relative -mt-16 mb-4">
              <div className="w-24 h-24 rounded-full border-8 border-[#1e1f22] overflow-hidden bg-[#2b2d31]">
                <Avatar
                  src={member.avatar}
                  alt={member.username}
                  size={92}
                  status={member.status}
                  showStatusBadge={true}
                />
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">
                {member.username}
              </h2>
              {member.tag && (
                <p className="text-sm text-[#b5bac1]">{member.tag}</p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#3f4147] mb-4" />

            {/* About Me */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-[#b5bac1]">
                About Me
              </h3>
              <p className="text-sm text-[#dbdee1]">
                Hey there! I'm a developer who loves building cool stuff. Always
                learning something new! 🚀
              </p>
            </div>

            {/* Member Since */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase text-[#b5bac1]">
                Member Since
              </h3>
              <div className="flex items-center gap-2 text-sm text-[#dbdee1]">
                <Calendar size={16} className="text-[#b5bac1]" />
                <span>Joined Jan 15, 2024</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#dbdee1]">
                <Clock size={16} className="text-[#b5bac1]" />
                <span>Last seen 2 hours ago</span>
              </div>
            </div>

            {/* Roles */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase text-[#b5bac1]">
                Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-2 py-1 bg-[#5865f2] text-white text-xs font-medium rounded">
                  {member.role}
                </div>
                <div className="px-2 py-1 bg-[#23a559] text-white text-xs font-medium rounded">
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Tabs & Content */}
        <div className="flex-1 flex flex-col bg-[#313338]">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1e1f22] hover:bg-[#2b2d31] flex items-center justify-center transition"
            >
              <X size={18} className="text-[#b5bac1]" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#3f4147] px-4">
            <TabButton
              label="User Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <TabButton
              label="Mutual Servers"
              active={activeTab === "mutual"}
              onClick={() => setActiveTab("mutual")}
            />
            <TabButton
              label="Notes"
              active={activeTab === "notes"}
              onClick={() => setActiveTab("notes")}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "profile" && (
              <div className="space-y-4">
                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#5865f2] hover:bg-[#4752c4]">
                    <MessageSquare size={18} className="mr-2" />
                    Message
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    <UserPlus size={18} className="mr-2" />
                    Add Friend
                  </Button>
                  <Button variant="ghost">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2">
                    Note
                  </label>
                  <textarea
                    placeholder="Click to add a note"
                    rows={3}
                    className="w-full px-3 py-2 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded outline-none focus:ring-2 focus:ring-[#00a8fc] resize-none"
                  />
                </div>

                {/* Badges */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#b5bac1] mb-3">
                    Badges
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-[#1e1f22] rounded-lg flex items-center justify-center hover:bg-[#2b2d31] transition cursor-pointer"
                      >
                        <Shield size={24} className="text-[#5865f2]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mutual" && (
              <div className="text-center py-12 text-[#87888c]">
                <User size={48} className="mx-auto mb-4 opacity-50" />
                <p>No mutual servers</p>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4">
                <textarea
                  placeholder="Add a private note about this user..."
                  rows={8}
                  className="w-full px-3 py-2 bg-[#1e1f22] text-[#dbdee1] placeholder-[#87888c] rounded outline-none focus:ring-2 focus:ring-[#00a8fc] resize-none"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm">
                    Clear
                  </Button>
                  <Button size="sm">Save Note</Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-3 border-t border-[#3f4147] flex justify-end gap-2">
            <Button variant="ghost" size="sm">
              <Flag size={16} className="mr-2" />
              Report
            </Button>
            <Button variant="ghost" size="sm" className="text-[#f23f43]">
              Block User
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-3 text-sm font-medium transition-colors relative",
        active ? "text-white" : "text-[#b5bac1] hover:text-[#dbdee1]"
      )}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
        />
      )}
    </button>
  );
}
