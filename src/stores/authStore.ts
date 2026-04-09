import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/shared/api/client';
import { STORAGE_KEYS } from '@/shared/constants';

export interface UserProfile {
  id: string;
  anonymousAlias: string;
  age?: number;
  gender?: string;
  bio?: string;
  interests: string[];
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Actions
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (phone, otp) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post<{ user: UserProfile; tokens: AuthTokens }>(
            '/auth/verify-otp',
            { phone, otp },
          );
          await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken);
          await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken);
          set({
            user: data.user,
            tokens: data.tokens,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'خطا در ورود';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        await AsyncStorage.multiRemove([STORAGE_KEYS.ACCESS_TOKEN, STORAGE_KEYS.REFRESH_TOKEN]);
        set({ user: null, tokens: null, isAuthenticated: false });
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const updated = await api.patch<UserProfile>('/users/me', data);
          set({ user: updated, isLoading: false });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'خطا در بروزرسانی پروفایل';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      refreshUser: async () => {
        if (!get().isAuthenticated) return;
        try {
          const user = await api.get<UserProfile>('/users/me');
          set({ user });
        } catch {
          // silently fail
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
