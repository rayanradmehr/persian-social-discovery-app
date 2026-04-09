import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthStore } from '@/stores/authStore';
import { socketManager } from '@/shared/socket/socket';
import { SOCKET_EVENTS } from '@/shared/constants';
import { useChatStore } from '@/stores/chatStore';
import { useDiscoveryStore } from '@/stores/discoveryStore';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Force RTL for Persian
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});

function SocketInitializer() {
  const { isAuthenticated } = useAuthStore();
  const { addIncomingMessage } = useChatStore();
  const { setMatch } = useDiscoveryStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    socketManager.connect().then(() => {
      socketManager.on(SOCKET_EVENTS.MESSAGE_RECEIVE, addIncomingMessage);
      socketManager.on(SOCKET_EVENTS.MATCH_FOUND, setMatch);
    });

    return () => {
      socketManager.off(SOCKET_EVENTS.MESSAGE_RECEIVE);
      socketManager.off(SOCKET_EVENTS.MATCH_FOUND);
    };
  }, [isAuthenticated, addIncomingMessage, setMatch]);

  return null;
}

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();

  const [fontsLoaded] = useFonts({
    'Vazirmatn-Regular': require('../../assets/fonts/Vazirmatn-Regular.ttf'),
    'Vazirmatn-Medium': require('../../assets/fonts/Vazirmatn-Medium.ttf'),
    'Vazirmatn-SemiBold': require('../../assets/fonts/Vazirmatn-SemiBold.ttf'),
    'Vazirmatn-Bold': require('../../assets/fonts/Vazirmatn-Bold.ttf'),
    'Vazirmatn-ExtraBold': require('../../assets/fonts/Vazirmatn-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SocketInitializer />
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="(auth)" />
          ) : (
            <Stack.Screen name="(tabs)" />
          )}
          <Stack.Screen name="chat/[id]" options={{ presentation: 'modal' }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
