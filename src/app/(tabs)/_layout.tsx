import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks/useTheme';
import { useChatStore } from '@/stores/chatStore';

// SVG icons as text symbols (replace with proper icons in production)
const Icons = {
  discovery: '❤️',
  chats: '💬',
  profile: '👤',
};

interface TabIconProps {
  icon: string;
  focused: boolean;
  badge?: number;
}

function TabIcon({ icon, focused, badge }: TabIconProps) {
  const theme = useTheme();
  return (
    <View style={styles.tabIconWrapper}>
      <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.5 }]}>{icon}</Text>
      {badge !== undefined && badge > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  const theme = useTheme();
  const { chats } = useChatStore();
  const totalUnread = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 0.5,
          height: 80,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Vazirmatn-Medium',
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="discovery"
        options={{
          tabBarLabel: 'کشف',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Icons.discovery} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: 'چت',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Icons.chats} focused={focused} badge={totalUnread} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'پروفایل',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Vazirmatn-Bold',
  },
});
