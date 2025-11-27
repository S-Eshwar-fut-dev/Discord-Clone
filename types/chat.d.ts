import type { Message, User, Attachment } from "./api";

// Extended chat types for frontend use
export interface ChatMessage extends Message {
  // Frontend-specific fields
  temp?: boolean;
  sending?: boolean;
  failed?: boolean;
  optimistic?: boolean;
}

export interface PongEvent {
  type: "pong";
  payload: Record<string, never>; // Empty payload
}

// Alias for compatibility (some components expect ChatUser)
export type ChatUser = User;

export interface SendMessagePayload {
  channelId: string;
  content: string;
  attachments?: Attachment[];
  tempId?: string;
}
//export interface ConnectionReadyEvent {
//type: "connection:ready";
//payload: {
//connectionId: string;
//};
//}

export interface MessageCreateEvent {
  type: "message:created";
  payload: Message;
  tempId?: string | null;
}
export interface MessageUpdateEvent {
  type: "message:update";
  payload: Partial<Message> & { id: string };
}

export interface MessageDeleteEvent {
  type: "message:delete";
  payload: {
    messageId: string;
  };
}
export interface ReactionAddEvent {
  type: "reaction:add";
  payload: {
    messageId: string;
    emoji: string;
    userId: string;
  };
}

export interface ReactionRemoveEvent {
  type: "reaction:remove";
  payload: {
    messageId: string;
    emoji: string;
    userId: string;
  };
}

export interface PresenceUpdateEvent {
  type: "presence:update";
  payload: {
    userId: string;
    status: "online" | "idle" | "dnd" | "offline";
    customStatus?: string | null;
  };
}

export type WSMessage =
  | ConnectionReadyEvent
  | PongEvent
  | MessageCreateEvent
  | MessageUpdateEvent
  | MessageDeleteEvent
  | PresenceUpdateEvent
  | ReactionAddEvent
  | ReactionRemoveEvent;

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  cursor?: string;
}
