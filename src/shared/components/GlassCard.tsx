import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/shared/hooks/useTheme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  borderRadius?: number;
  padding?: number;
}

/**
 * A frosted glass card component using expo-blur.
 * Used for premium overlay cards, match cards, and modal sheets.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 60,
  tint = 'dark',
  borderRadius = 20,
  padding = 16,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          borderColor: theme.colors.border + '60',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[styles.blur, { padding }]}
      >
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
  },
});
