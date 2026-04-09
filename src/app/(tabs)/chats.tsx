import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useChatStore, type Chat } from '@/stores/chatStore';
import { useTheme } from '@/shared/hooks/useTheme';
import { Avatar } from '@/shared/components/Avatar';

function ChatListItem({ chat, onPress }: { chat: Chat; onPress: () => void }) {
  const theme = useTheme();
  const time = new Date(chat.updatedAt).toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      style={[styles.chatItem, { borderBottomColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Avatar
        size="md"
        anonymousMode
        online={chat.isOnline}
        initials={chat.participantAlias.slice(0, 1)}
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.alias, { color: theme.colors.text, fontFamily: 'Vazirmatn-SemiBold' }]}>
            {chat.participantAlias}
          </Text>
          <Text style={[styles.time, { color: theme.colors.textSecondary, fontFamily: 'Vazirmatn-Regular' }]}>
            {time}
          </Text>
        </View>
        <View style={styles.chatFooter}>
          <Text
            style={[styles.lastMessage, { color: theme.colors.textSecondary, fontFamily: 'Vazirmatn-Regular' }]}
            numberOfLines={1}
          >
            {chat.lastMessage?.content ?? 'شروع مکالمه...'}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ChatsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { chats, fetchChats } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: 'Vazirmatn-Bold' }]}>
          چت‌ها
        </Text>
      </View>

      {chats.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary, fontFamily: 'Vazirmatn-Medium' }]}>
            هنوز چتی نداری!
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary, fontFamily: 'Vazirmatn-Regular' }]}>
            با کشف ناشناخته‌ها شروع کن
          </Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              chat={item}
              onPress={() => router.push(`/chat/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: 'flex-end',
  },
  title: { fontSize: 28 },
  list: { paddingHorizontal: 16 },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  chatContent: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alias: { fontSize: 15 },
  time: { fontSize: 12 },
  chatFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 },
  lastMessage: { fontSize: 13, flex: 1 },
  unreadBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginStart: 8,
  },
  unreadText: { color: '#FFF', fontSize: 11, fontFamily: 'Vazirmatn-Bold' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyText: { fontSize: 18 },
  emptySubtext: { fontSize: 14 },
});
