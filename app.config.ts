import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Naab',
  slug: 'persian-social-discovery-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0B0D10'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.rayanradmehr.naab'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0B0D10'
    },
    package: 'com.rayanradmehr.naab',
    softwareKeyboardLayoutMode: 'pan'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-secure-store',
    'expo-font',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#0B0D10',
        image: './assets/splash.png',
        imageWidth: 200
      }
    ],
    'react-native-mmkv'
  ],
  extra: {
    apiBaseUrl: process.env['EXPO_PUBLIC_API_BASE_URL'],
    socketUrl: process.env['EXPO_PUBLIC_SOCKET_URL'],
    env: process.env['EXPO_PUBLIC_ENV'] ?? 'development',
    enableGuestLogin: process.env['EXPO_PUBLIC_ENABLE_GUEST_LOGIN'] === 'true'
  }
});
