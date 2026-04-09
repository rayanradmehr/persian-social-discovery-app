import { useColorScheme } from 'react-native';
import { theme, darkTheme, lightTheme, type Theme } from '@/theme';

/**
 * Theme hook that provides the correct theme object
 * based on system color scheme preference.
 */
export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

/**
 * Returns only the colors from the current theme.
 */
export const useColors = () => {
  const currentTheme = useTheme();
  return currentTheme.colors;
};

/**
 * Returns the full shared theme (non-color-scheme specific values).
 */
export const useDesignSystem = () => {
  return {
    spacing: theme.spacing,
    typography: theme.typography,
    radius: theme.radius,
    shadows: theme.shadows,
  };
};
