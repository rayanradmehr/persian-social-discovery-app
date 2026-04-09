export const palette = {
  neutral: {
    950: '#0B0D10',
    900: '#111418',
    850: '#151A20',
    800: '#1B2128',
    700: '#2A313A',
    500: '#7D8794',
    300: '#C6CDD6',
    100: '#EEF2F6'
  },
  primary: {
    500: '#6E7CF6',
    400: '#8591FF',
    300: '#A6AFFF'
  },
  success: '#2FB27A',
  warning: '#E3A53F',
  danger: '#E26767',
  info: '#5DA9E9'
} as const;

export const darkColors = {
  bg: palette.neutral[950],
  surface: palette.neutral[900],
  surfaceElevated: palette.neutral[850],
  surfaceHigh: palette.neutral[800],
  border: palette.neutral[700],
  borderSubtle: 'rgba(255,255,255,0.08)',
  textPrimary: palette.neutral[100],
  textSecondary: palette.neutral[300],
  textMuted: palette.neutral[500],
  accent: palette.primary[500],
  accentLight: palette.primary[400],
  online: palette.success,
  busy: palette.warning,
  invisible: palette.neutral[500],
  danger: palette.danger,
  info: palette.info
} as const;

export const lightColors = {
  bg: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceHigh: '#F0F2F5',
  border: '#D5DBE4',
  borderSubtle: 'rgba(14,18,24,0.08)',
  textPrimary: '#12161C',
  textSecondary: '#364152',
  textMuted: '#667085',
  accent: '#5D6BEE',
  accentLight: '#7280F8',
  online: '#1E9E67',
  busy: '#C88719',
  invisible: '#667085',
  danger: '#D44F4F',
  info: '#4A97D8'
} as const;

export type Colors = typeof darkColors;
