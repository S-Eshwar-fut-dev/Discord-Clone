"use client";

import { useRouter, usePathname } from "next/navigation";
import { Plus, Compass } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import CreateServerModal from "@/components/overlays/CreateServerModal";
import GuildIcon from "./GuildIcon";
import { mockGuilds } from "@/components/mocks/mockGuilds";

interface GuildsRailProps {
  activeGuildId?: string;
}

export default function GuildsRail({ activeGuildId }: GuildsRailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isDMActive = pathname.startsWith("/channels/@me");

  const handleGuildClick = (guildId: string) => {
    if (guildId === "@me") {
      router.push("/channels/@me");
    } else {
      // Navigate to first text channel of the guild
      router.push(`/channels/${guildId}/1`);
    }
  };

  return (
    <>
      <nav className="w-[72px] h-screen flex flex-col items-center py-3 bg-[#1E1F22] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Home Button (DMs) */}
        <div className="mb-2">
          <GuildTooltip label="Direct Messages">
            <button
              onClick={() => handleGuildClick("@me")}
              className={cn(
                "relative w-12 h-12 flex items-center justify-center rounded-3xl transition-all duration-200 group",
                isDMActive
                  ? "rounded-2xl bg-[#5865f2]"
                  : "bg-[#313338] hover:bg-[#5865f2] hover:rounded-2xl"
              )}
            >
              {/* Discord Logo SVG */}
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                className="fill-current text-white"
              >
                <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.777 19.2689 20.3031 20C22.6712 19.2689 24.8964 18.1418 26.8876 16.652C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3192 13.6383C17.0363 13.6383 15.9796 12.4453 15.9796 10.994C15.9796 9.54272 17.0103 8.34973 18.3192 8.34973C19.6281 8.34973 20.6783 9.54272 20.6575 10.994C20.6575 12.4453 19.6281 13.6383 18.3192 13.6383Z" />
              </svg>

              {/* Active Indicator */}
              {isDMActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 rounded-r-full bg-white transition-all" />
              )}

              {/* Hover Indicator */}
              {!isDMActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-5 scale-0 group-hover:scale-100 rounded-r-full bg-white transition-all" />
              )}
            </button>
          </GuildTooltip>
        </div>

        {/* Separator */}
        <div className="w-8 h-0.5 bg-[#35363C] rounded-lg mb-2 shrink-0" />

        {/* Guild List */}
        <div className="flex flex-col gap-2 w-full items-center">
          {mockGuilds.map((guild) => (
            <GuildTooltip key={guild.id} label={guild.name}>
              <GuildIcon
                name={guild.name}
                icon={guild.icon}
                isActive={activeGuildId === guild.id}
                unread={guild.unread}
                mentions={guild.mentions}
                onClick={() => handleGuildClick(guild.id)}
              />
            </GuildTooltip>
          ))}
        </div>

        {/* Separator */}
        <div className="w-8 h-0.5 bg-[#35363C] rounded-lg my-2 shrink-0" />

        {/* Add Server Button */}
        <div className="mb-2">
          <GuildTooltip label="Add a Server">
            <button
              onClick={() => setShowCreateModal(true)}
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 transition-all duration-200",
                "rounded-3xl bg-[#313338] text-[#23a559]",
                "hover:rounded-2xl hover:bg-[#23a559] hover:text-white"
              )}
            >
              <Plus size={24} className="transition-colors" />
            </button>
          </GuildTooltip>
        </div>

        {/* Explore Button */}
        <div className="mb-2">
          <GuildTooltip label="Explore Discoverable Servers">
            <button
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 transition-all duration-200",
                "rounded-3xl bg-[#313338] text-[#23a559]",
                "hover:rounded-2xl hover:bg-[#23a559] hover:text-white"
              )}
            >
              <Compass size={24} className="transition-colors" />
            </button>
          </GuildTooltip>
        </div>
      </nav>

      <CreateServerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}

// Tooltip Component
function GuildTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group flex items-center justify-center">
      {children}

      {/* Tooltip */}
      <div className="invisible group-hover:visible absolute left-[60px] px-3 py-1 rounded-md bg-black text-white text-xs whitespace-nowrap shadow-xl z-50 pointer-events-none">
        {label}
        {/* Arrow */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black" />
      </div>
    </div>
  );
}
