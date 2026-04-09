import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

const MOCK_PROFILES: Record<string, any> = {
  '2': {
    id: '2',
    name: 'سارا خانی',
    age: 25,
    city: 'اصفهان',
    bio: 'عاشق هنر و خلاقیت. دوستدار موسیقی شرقی و پیانو می‌زنم.',
    interests: ['هنر', 'موسیقی', 'نقاشی', 'سفر', 'طبیعت'],
    verified: true,
    distance: 12,
    commonInterests: ['موسیقی', 'سفر'],
  },
};

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const profile = MOCK_PROFILES[String(id)] || {
    id: String(id),
    name: 'کاربر',
    age: 24,
    city: 'تهران',
    bio: 'بیوگرافی وجود ندارد.',
    interests: [],
    verified: false,
    distance: 5,
    commonInterests: [],
  };

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
    Alert.alert('لایک شد!', `پروفایل ${profile.name} را لایک کردید`);
  };

  const handleMessage = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportBtn}>
            <Ionicons name="ellipsis-horizontal" size={22} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
            </View>
            {profile.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={10} color="#FFF" />
              </View>
            )}
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{profile.name}، {profile.age}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#888" />
            <Text style={styles.locationText}>{profile.city} · {profile.distance} کیلومتر</Text>
          </View>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>

        {/* Common Interests */}
        {profile.commonInterests.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>علایق مشترک</Text>
            <View style={styles.tagsRow}>
              {profile.commonInterests.map((interest: string) => (
                <View key={interest} style={[styles.tag, styles.tagCommon]}>
                  <Text style={styles.tagCommonText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* All Interests */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>علایق</Text>
          <View style={styles.tagsRow}>
            {profile.interests.map((interest: string) => (
              <View key={interest} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.likeBtn, liked && styles.likedBtn]}
          onPress={handleLike}
          disabled={liked}
        >
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color="#FFF" />
          <Text style={styles.actionBtnText}>{liked ? 'لایک شد' : 'لایک'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.msgBtn]} onPress={handleMessage}>
          <Ionicons name="chatbubble-outline" size={22} color="#FFF" />
          <Text style={styles.actionBtnText}>پیام</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: { padding: 8 },
  reportBtn: { padding: 8 },
  avatarSection: { alignItems: 'center', paddingTop: 16, paddingBottom: 8 },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#0F3460',
  },
  avatarText: { fontSize: 46, color: '#FFF', fontWeight: 'bold' },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1A1A2E',
  },
  infoSection: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  locationText: { fontSize: 14, color: '#888' },
  bio: { fontSize: 15, color: '#CCC', textAlign: 'center', lineHeight: 24 },
  card: {
    backgroundColor: '#16213E',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: { fontSize: 14, color: '#888', marginBottom: 10, textAlign: 'right' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: '#0F3460',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagCommon: { backgroundColor: '#4ECDC422', borderWidth: 1, borderColor: '#4ECDC4' },
  tagText: { fontSize: 13, color: '#CCC' },
  tagCommonText: { fontSize: 13, color: '#4ECDC4' },
  bottomPad: { height: 100 },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#1A1A2E',
    borderTopWidth: 0.5,
    borderTopColor: '#2A2A4A',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  likeBtn: { backgroundColor: '#FF6B9D' },
  likedBtn: { backgroundColor: '#444' },
  msgBtn: { backgroundColor: '#4ECDC4' },
  actionBtnText: { fontSize: 15, fontWeight: 'bold', color: '#FFF' },
});
