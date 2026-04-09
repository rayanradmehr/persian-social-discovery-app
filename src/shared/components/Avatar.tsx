import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string | null;
  initials?: string;
  size?: AvatarSize;
  online?: boolean;
  style?: ViewStyle;
  anonymousMode?: boolean;
}

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
};

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  initials = '?',
  size = 'md',
  online,
  style,
  anonymousMode = false,
}) => {
  const theme = useTheme();
  const dimension = SIZE_MAP[size];
  const fontSize = dimension * 0.38;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.avatar,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            backgroundColor: anonymousMode ? theme.colors.surface : theme.colors.primary + '22',
            borderWidth: anonymousMode ? 2 : 0,
            borderColor: anonymousMode ? theme.colors.primary + '44' : 'transparent',
          },
        ]}
      >
        {uri && !anonymousMode ? (
          <Image
            source={{ uri }}
            style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
          />
        ) : (
          <Text
            style={[
              styles.initials,
              {
                fontSize,
                color: anonymousMode ? theme.colors.textSecondary : theme.colors.primary,
                fontFamily: 'Vazirmatn-Bold',
              },
            ]}
          >
            {anonymousMode ? '?' : initials.slice(0, 2)}
          </Text>
        )}
      </View>
      {online !== undefined && (
        <View
          style={[
            styles.onlineDot,
            {
              width: dimension * 0.25,
              height: dimension * 0.25,
              borderRadius: (dimension * 0.25) / 2,
              backgroundColor: online ? theme.colors.success : theme.colors.textSecondary,
              borderColor: theme.colors.background,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontWeight: '700',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
});
