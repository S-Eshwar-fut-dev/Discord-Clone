import { apiClient } from "./client";

export interface Channel {
  id: string;
  guildId?: string | null;
  name: string;
  type: "text" | "voice" | "dm";
}

export async function fetchChannels(guildId?: string): Promise<Channel[]> {
  const query = guildId ? `?guildId=${guildId}` : "";
  return apiClient.get<Channel[]>(`/api/channels${query}`);
}

export async function createChannel(data: {
  guildId?: string;
  name: string;
  type?: "text" | "voice";
}): Promise<Channel> {
  return apiClient.post<Channel>("/api/channels", data);
}
