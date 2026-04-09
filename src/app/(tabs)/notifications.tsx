import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Notification = {
  id: string;
  type: 'like' | 'match' | 'message' | 'visit';
  userName: string;
  time: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'match', userName: 'سارا خانی', time: '۲ دقیقه پیش', read: false },
  { id: '2', type: 'like', userName: 'مریم رضایی', time: '۱۵ دقیقه پیش', read: false },
  { id: '3', type: 'message', userName: 'نیلوفر احمدی', time: '۱ ساعت پیش', read: false },
  { id: '4', type: 'visit', userName: 'زهرا موسوی', time: '۲ ساعت پیش', read: true },
  { id: '5', type: 'like', userName: 'سهیلا ناصری', time: '۳ ساعت پیش', read: true },
  { id: '6', type: 'match', userName: 'لیلا کریمی', time: 'دیروز', read: true },
  { id: '7', type: 'message', userName: 'الهام صادقی', time: 'دیروز', read: true },
];

const NOTIFICATION_CONFIG = {
  match: { icon: 'heart', color: '#FF6B9D', text: 'با شما مچ شد!' },
  like: { icon: 'star', color: '#FFD700', text: 'پروفایل شما را لایک کرد' },
  message: { icon: 'chatbubble', color: '#4ECDC4', text: 'برایتان پیام فرستاد' },
  visit: { icon: 'eye', color: '#A855F7', text: 'پروفایل شما را دید' },
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderItem = ({ item }: { item: Notification }) => {
    const config = NOTIFICATION_CONFIG[item.type];
    return (
      <TouchableOpacity
        style={[styles.notifItem, !item.read && styles.notifUnread]}
        onPress={() => markRead(item.id)}
      >
        <View style={[styles.iconCircle, { backgroundColor: config.color + '22' }]}>
          <Ionicons name={config.icon as any} size={22} color={config.color} />
        </View>
        <View style={styles.notifContent}>
          <Text style={styles.notifText}>
            <Text style={styles.notifName}>{item.userName}</Text>
            {'  '}{config.text}
          </Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Text style={styles.headerTitle}>اعلان‌ها</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAllBtn}>همه خوانده شد</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={64} color="#444" />
            <Text style={styles.emptyText}>اعلانی وجود ندارد</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  badge: {
    backgroundColor: '#FF6B9D',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  markAllBtn: { fontSize: 13, color: '#4ECDC4' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#16213E',
    gap: 12,
  },
  notifUnread: { backgroundColor: '#1E2A4A' },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifContent: { flex: 1 },
  notifText: { fontSize: 14, color: '#CCC', lineHeight: 20 },
  notifName: { fontWeight: 'bold', color: '#FFF' },
  notifTime: { fontSize: 12, color: '#666', marginTop: 4 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
  },
  separator: { height: 8 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyText: { fontSize: 16, color: '#666', marginTop: 12 },
});
