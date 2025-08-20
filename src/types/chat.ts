export interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  text: string;
  from: "user" | "bot";
  timestamp: string;
}
