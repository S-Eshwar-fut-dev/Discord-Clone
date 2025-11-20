import { apiClient } from "./client";
import type { ChatMessage } from "@/types/chat";

export interface MessageResponse {
  items: ChatMessage[];
  nextCursor?: string;
  total: number;
}

export async function fetchMessages(
  channelId: string,
  limit = 50,
  cursor?: string
): Promise<MessageResponse> {
  let query = `?channelId=${channelId}&limit=${limit}`;
  if (cursor) query += `&cursor=${cursor}`;
  return apiClient.get<MessageResponse>(`/api/messages${query}`);
}

export async function createMessage(data: {
  channelId: string;
  authorId: string;
  content: string;
}): Promise<ChatMessage> {
  return apiClient.post<ChatMessage>("/api/messages", data);
}
