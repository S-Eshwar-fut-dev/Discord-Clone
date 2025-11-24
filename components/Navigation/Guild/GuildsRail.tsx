"use client";

import { useState } from "react";
import { Plus, Compass } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import CreateServerModal from "@/components/overlays/CreateServerModal";
import GuildIcon from "./GuildIcon";
import ServerTooltip from "./ServerTooltip";

// Mock Data (You can replace this with your API fetch later)
const mockGuilds = [
  { id: "home", label: "Home", short: "Dc", icon: "/servers/home.png" },
  { id: "es", label: "Eshwar S", short: "ES", color: "#8b5cf6" },
  { id: "fm", label: "Fm", short: "Fm", color: "#fb7185" },
];

export default function GuildsRail() {
  const [active, setActive] = useState<string>("home");
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <nav className="w-[72px] h-screen flex flex-col items-center bg-[#1e1f22] py-3 overflow-y-auto no-scrollbar select-none">
        {/* Home Button */}
        <div className="mb-2">
          <ServerTooltip label="Direct Messages">
            <GuildIcon
              name="Direct Messages"
              icon="/discord-logo-white.svg" // Make sure you have a logo or use text
              isActive={active === "home"}
              onClick={() => setActive("home")}
              isHome
            />
          </ServerTooltip>
        </div>

        <div className="w-8 h-0.5 bg-[#35363c] rounded-lg mb-2" />

        {/* Guild List */}
        <div className="flex flex-col gap-2 w-full items-center">
          {mockGuilds.slice(1).map((g) => (
            <ServerTooltip key={g.id} label={g.label}>
              <GuildIcon
                name={g.label}
                isActive={active === g.id}
                onClick={() => setActive(g.id)}
              />
            </ServerTooltip>
          ))}
        </div>

        <div className="w-8 h-0.5 bg-[#35363c] rounded-lg my-2" />

        {/* Add Server Button */}
        <ServerTooltip label="Add a Server">
          <button
            onClick={() => setShowCreateModal(true)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-3xl hover:rounded-2xl transition-all duration-200 bg-[#313338] hover:bg-[#23a559] text-[#23a559] hover:text-white"
          >
            <Plus size={24} transition-colors />
          </button>
        </ServerTooltip>

        {/* Explore Button */}
        <div className="mt-2">
          <ServerTooltip label="Explore Discoverable Servers">
            <button className="group relative flex items-center justify-center w-12 h-12 rounded-3xl hover:rounded-2xl transition-all duration-200 bg-[#313338] hover:bg-[#23a559] text-[#23a559] hover:text-white">
              <Compass size={24} transition-colors />
            </button>
          </ServerTooltip>
        </div>
      </nav>

      <CreateServerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}
