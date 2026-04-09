import { Platform } from 'react-native';

export const shadows = {
  none: Platform.select({
    ios: {},
    android: { elevation: 0 },
  }),
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
    },
    android: { elevation: 12 },
  }),
  glow: Platform.select({
    ios: {
      shadowColor: '#FF6B9D',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  }),
  glowPrimary: Platform.select({
    ios: {
      shadowColor: '#C44569',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
    },
    android: { elevation: 10 },
  }),
} as const;

export type ShadowKey = keyof typeof shadows;
