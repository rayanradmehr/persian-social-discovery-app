import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
  ...rest
}) => {
  const theme = useTheme();

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: theme.colors.error,
    },
  };

  const textVariantStyles: Record<ButtonVariant, TextStyle> = {
    primary: { color: '#FFFFFF' },
    secondary: { color: theme.colors.primary },
    ghost: { color: theme.colors.primary },
    danger: { color: '#FFFFFF' },
  };

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { height: 36, paddingHorizontal: 12, borderRadius: 10 },
    md: { height: 48, paddingHorizontal: 20, borderRadius: 14 },
    lg: { height: 56, paddingHorizontal: 28, borderRadius: 16 },
  };

  const textSizeStyles: Record<ButtonSize, TextStyle> = {
    sm: { fontSize: 13, fontFamily: 'Vazirmatn-Medium' },
    md: { fontSize: 15, fontFamily: 'Vazirmatn-SemiBold' },
    lg: { fontSize: 17, fontFamily: 'Vazirmatn-Bold' },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFF' : theme.colors.primary} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text style={[styles.text, textVariantStyles[variant], textSizeStyles[size], textStyle]}>
            {label}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    writingDirection: 'rtl',
  },
});
