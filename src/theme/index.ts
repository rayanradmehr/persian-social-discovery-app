import { useColorScheme } from 'react-native';
import { darkColors, lightColors, type Colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './variants';

export interface Theme {
  colors: Colors;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  isDark: boolean;
}

export const createTheme = (isDark: boolean): Theme => ({
  colors: isDark ? darkColors : lightColors,
  typography,
  spacing,
  radius,
  shadows,
  isDark
});

export const darkTheme = createTheme(true);
export const lightTheme = createTheme(false);

export const useTheme = (): Theme => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};
