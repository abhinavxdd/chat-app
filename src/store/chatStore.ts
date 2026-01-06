import { create } from "zustand";

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  roomId: string;
}

interface User {
  userId: string;
  username: string;
}

interface TypingUser {
  username: string;
  isTyping: boolean;
}

interface ChatStore {
  messages: Message[];
  currentRoom: string | null;
  users: User[];
  typingUsers: TypingUser[];
  addMessage: (message: Message) => void;
  setRoom: (roomId: string | null) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  setTyping: (username: string, isTyping: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  // Initial state
  messages: [],
  currentRoom: null,
  users: [],
  typingUsers: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setRoom: (roomId) => set({ currentRoom: roomId }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.userId !== userId),
    })),

  setTyping: (username, isTyping) =>
    set((state) => {
      const existing = state.typingUsers.find((u) => u.username === username);
      if (existing) {
        return {
          typingUsers: state.typingUsers.map((u) =>
            u.username === username ? { username, isTyping } : u
          ),
        };
      }
      return {
        typingUsers: [...state.typingUsers, { username, isTyping }],
      };
    }),

  clearMessages: () => set({ messages: [] }),
}));
