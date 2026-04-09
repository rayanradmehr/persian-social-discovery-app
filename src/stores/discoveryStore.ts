import { create } from 'zustand';
import { socketManager } from '@/shared/socket/socket';
import { SOCKET_EVENTS } from '@/shared/constants';
import { api } from '@/shared/api/client';

export type DiscoveryStatus = 'idle' | 'searching' | 'matched' | 'connecting';

export interface MatchCandidate {
  matchId: string;
  userId: string;
  anonymousAlias: string;
  compatibilityScore: number;
  sharedInterests: string[];
  expiresAt: string;
}

interface DiscoveryState {
  status: DiscoveryStatus;
  currentMatch: MatchCandidate | null;
  matchHistory: string[];
  filters: {
    ageRange?: [number, number];
    gender?: string;
    interests?: string[];
  };
  // Actions
  startSearching: () => void;
  stopSearching: () => void;
  acceptMatch: (matchId: string) => Promise<void>;
  declineMatch: (matchId: string) => void;
  setMatch: (match: MatchCandidate) => void;
  updateFilters: (filters: Partial<DiscoveryState['filters']>) => void;
  reset: () => void;
}

export const useDiscoveryStore = create<DiscoveryState>()((set, get) => ({
  status: 'idle',
  currentMatch: null,
  matchHistory: [],
  filters: {},

  startSearching: () => {
    set({ status: 'searching', currentMatch: null });
    socketManager.emit(SOCKET_EVENTS.JOIN_POOL, get().filters);
  },

  stopSearching: () => {
    socketManager.emit(SOCKET_EVENTS.LEAVE_POOL);
    set({ status: 'idle' });
  },

  acceptMatch: async (matchId) => {
    set({ status: 'connecting' });
    try {
      await api.post('/discovery/accept', { matchId });
      socketManager.emit(SOCKET_EVENTS.MATCH_ACCEPTED, { matchId });
      set((state) => ({
        matchHistory: [...state.matchHistory, matchId],
      }));
    } catch {
      set({ status: 'matched' }); // revert
    }
  },

  declineMatch: (matchId) => {
    socketManager.emit(SOCKET_EVENTS.MATCH_DECLINED, { matchId });
    set({ status: 'searching', currentMatch: null });
  },

  setMatch: (match) => {
    set({ status: 'matched', currentMatch: match });
  },

  updateFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  reset: () => {
    socketManager.emit(SOCKET_EVENTS.LEAVE_POOL);
    set({ status: 'idle', currentMatch: null });
  },
}));
