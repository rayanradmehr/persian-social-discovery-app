import { create } from 'zustand';
import { socketManager } from '@/shared/socket/socket';
import { SOCKET_EVENTS } from '@/shared/constants';
import { api } from '@/shared/api/client';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  contentType: 'text' | 'image' | 'voice';
  readAt?: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  participantId: string;
  participantAlias: string;
  lastMessage?: Message;
  unreadCount: number;
  isOnline: boolean;
  updatedAt: string;
}

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  activeChat: string | null;
  typingUsers: Record<string, boolean>;
  isLoading: boolean;
  // Actions
  fetchChats: () => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, content: string, contentType?: Message['contentType']) => Promise<void>;
  setActiveChat: (chatId: string | null) => void;
  setTyping: (chatId: string, isTyping: boolean) => void;
  markAsRead: (chatId: string) => void;
  addIncomingMessage: (message: Message) => void;
  setUserOnline: (userId: string, isOnline: boolean) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  chats: [],
  messages: {},
  activeChat: null,
  typingUsers: {},
  isLoading: false,

  fetchChats: async () => {
    set({ isLoading: true });
    try {
      const chats = await api.get<Chat[]>('/chats');
      set({ chats, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchMessages: async (chatId) => {
    set({ isLoading: true });
    try {
      const messages = await api.get<Message[]>(`/chats/${chatId}/messages`);
      set((state) => ({
        messages: { ...state.messages, [chatId]: messages },
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  sendMessage: async (chatId, content, contentType = 'text') => {
    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      chatId,
      senderId: 'me',
      content,
      contentType,
      createdAt: new Date().toISOString(),
    };
    // Optimistic update
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] ?? []), optimisticMsg],
      },
    }));
    socketManager.emit(SOCKET_EVENTS.MESSAGE_SEND, { chatId, content, contentType });
  },

  setActiveChat: (chatId) => set({ activeChat: chatId }),

  setTyping: (chatId, isTyping) => {
    socketManager.emit(
      isTyping ? SOCKET_EVENTS.TYPING_START : SOCKET_EVENTS.TYPING_STOP,
      { chatId },
    );
  },

  markAsRead: (chatId) => {
    socketManager.emit(SOCKET_EVENTS.MESSAGE_READ, { chatId });
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, unreadCount: 0 } : c,
      ),
    }));
  },

  addIncomingMessage: (message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [message.chatId]: [...(state.messages[message.chatId] ?? []), message],
      },
      chats: state.chats.map((c) =>
        c.id === message.chatId
          ? {
              ...c,
              lastMessage: message,
              unreadCount: state.activeChat === message.chatId ? 0 : c.unreadCount + 1,
            }
          : c,
      ),
    }));
  },

  setUserOnline: (userId, isOnline) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.participantId === userId ? { ...c, isOnline } : c,
      ),
    }));
  },
}));
