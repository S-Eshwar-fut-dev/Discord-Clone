export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // Array of user IDs who reacted
  me: boolean; // Whether current user reacted
}

export interface MessageReaction {
  messageId: string;
  reactions: Reaction[];
}

export interface AddReactionPayload {
  messageId: string;
  emoji: string;
  userId: string;
}

export interface RemoveReactionPayload {
  messageId: string;
  emoji: string;
  userId: string;
}
