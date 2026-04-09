import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
};

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'سلام! خوبی؟', sender: 'other', time: '10:00' },
  { id: '2', text: 'مرسی، شما چطورید؟', sender: 'me', time: '10:01' },
  { id: '3', text: 'خوبم، ممنون مچمون شدیم!', sender: 'other', time: '10:02' },
  { id: '4', text: 'بله خیلی خوشحال شدم منم هم یه سوال دارم...', sender: 'me', time: '10:03' },
  { id: '5', text: 'بفرمایید!', sender: 'other', time: '10:03' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: String(Date.now()),
      text: inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowOther]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={[styles.messageText, isMe ? styles.messageTextMe : styles.messageTextOther]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, isMe ? styles.timeTextMe : styles.timeTextOther]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>س</Text>
          </View>
          <View>
            <Text style={styles.headerName}>سارا خانی</Text>
            <Text style={styles.headerStatus}>آنلاین</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call-outline" size={22} color="#4ECDC4" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="پیامت را بنویسید..."
            placeholderTextColor="#666"
            multiline
            textAlign="right"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#16213E',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2A2A4A',
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 8 },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  headerName: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  headerStatus: { fontSize: 12, color: '#4ECDC4' },
  callBtn: { padding: 4 },
  messagesList: { padding: 16, gap: 8 },
  messageRow: { flexDirection: 'row', marginBottom: 4 },
  messageRowMe: { justifyContent: 'flex-end' },
  messageRowOther: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  bubbleMe: { backgroundColor: '#4ECDC4', borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: '#16213E', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 22 },
  messageTextMe: { color: '#1A1A2E' },
  messageTextOther: { color: '#FFF' },
  timeText: { fontSize: 10, alignSelf: 'flex-end' },
  timeTextMe: { color: '#1A1A2E99' },
  timeTextOther: { color: '#66666699' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#16213E',
    borderTopWidth: 0.5,
    borderTopColor: '#2A2A4A',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#0F3460',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 15,
    maxHeight: 120,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#2A2A4A' },
});
