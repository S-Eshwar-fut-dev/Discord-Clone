import type { WSMessage } from "@/types/chat";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/ws";
const RECONNECT_DELAY = 3000;
const MAX_RECONNECT_ATTEMPTS = 10;
const HEARTBEAT_INTERVAL = 30000; // 30 seconds

type EventHandler = (data: any) => void;

export class WSClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private handlers = new Map<string, Set<EventHandler>>();
  private isIntentionallyClosed = false;
  private debug: boolean;
  private connectionId: string | null = null;
  private messageQueue: WSMessage[] = [];

  constructor(url: string, debug = false) {
    this.url = url;
    this.debug = debug || process.env.NEXT_PUBLIC_DEBUG === "true";
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      this.isIntentionallyClosed = false;
      this.log("🔌 Connecting to WebSocket...");

      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          this.log("✅ WebSocket connected");
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.flushMessageQueue();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WSMessage = JSON.parse(event.data);
            this.log("📩 Received:", message);

            // Handle system messages
            if (message.type === "connection:ready") {
              this.connectionId = message.payload?.connectionId;
              this.log("🆔 Connection ID:", this.connectionId);
            }

            if (message.type === "pong") {
              this.log("💓 Heartbeat received");
              return;
            }

            this.handleMessage(message);
          } catch (error) {
            this.log("❌ Failed to parse message:", error);
          }
        };

        this.ws.onerror = (error) => {
          this.log("❌ WebSocket error:", error);
          reject(error);
        };

        this.ws.onclose = (event) => {
          this.log(
            `🔌 WebSocket closed (code: ${event.code}, reason: ${event.reason})`
          );
          this.ws = null;
          this.stopHeartbeat();

          if (!this.isIntentionallyClosed) {
            this.scheduleReconnect();
          }
        };
      } catch (error) {
        this.log("❌ Connection error:", error);
        reject(error);
      }
    });
  }

  disconnect() {
    this.log("🔌 Disconnecting...");
    this.isIntentionallyClosed = true;

    this.stopHeartbeat();

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }

    this.connectionId = null;
    this.messageQueue = [];
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      this.log("❌ Max reconnection attempts reached");
      this.emit("connection:failed", { attempts: this.reconnectAttempts });
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(RECONNECT_DELAY * this.reconnectAttempts, 30000);

    this.log(
      `🔄 Scheduling reconnection attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} in ${delay}ms`
    );

    this.emit("connection:reconnecting", {
      attempt: this.reconnectAttempts,
      maxAttempts: MAX_RECONNECT_ATTEMPTS,
      delay,
    });

    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch(() => {
        // Will retry again if fails
      });
    }, delay);
  }

  private startHeartbeat() {
    this.stopHeartbeat();

    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send("ping", {});
      }
    }, HEARTBEAT_INTERVAL);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private flushMessageQueue() {
    if (this.messageQueue.length === 0) return;

    this.log(`📤 Flushing ${this.messageQueue.length} queued messages`);

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message.type, message.payload);
      }
    }
  }

  send(type: string, payload: any, priority = false) {
    const message = { type, payload };

    if (this.ws?.readyState !== WebSocket.OPEN) {
      if (priority) {
        this.log("WebSocket not connected, queuing priority message");
        this.messageQueue.unshift(message);
      } else {
        this.log("WebSocket not connected, queuing message");
        this.messageQueue.push(message);
      }

      // Try to reconnect if not already trying
      if (!this.reconnectTimeout && !this.isIntentionallyClosed) {
        this.connect().catch(() => {});
      }

      return;
    }

    this.log("📤 Sending:", message);
    this.ws.send(JSON.stringify(message));
  }

  on(eventType: string, handler: EventHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: EventHandler) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  once(eventType: string, handler: EventHandler) {
    const wrappedHandler = (data: any) => {
      handler(data);
      this.off(eventType, wrappedHandler);
    };
    this.on(eventType, wrappedHandler);
  }

  private handleMessage(message: WSMessage) {
    const handlers = this.handlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => handler(message.payload));
    }

    // Also emit to wildcard listeners
    const wildcardHandlers = this.handlers.get("*");
    if (wildcardHandlers) {
      wildcardHandlers.forEach((handler) => handler(message));
    }
  }

  private emit(eventType: string, payload: any) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  }

  private log(...args: any[]) {
    if (this.debug) {
      console.log("[WSClient]", ...args);
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  get readyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }

  get getConnectionId(): string | null {
    return this.connectionId;
  }
}

// Export singleton instance
export const wsClient = new WSClient(WS_URL);

// Auto-connect on module load (only in browser)
if (typeof window !== "undefined") {
  wsClient.connect().catch((err) => {
    console.error("Failed to auto-connect WebSocket:", err);
  });

  // Reconnect on page visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !wsClient.isConnected) {
      wsClient.connect().catch(() => {});
    }
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    wsClient.disconnect();
  });
}
