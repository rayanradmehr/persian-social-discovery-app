import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type User = {
  id: string;
  name: string;
  age: number;
  city: string;
  bio?: string;
  interests?: string[];
  verified?: boolean;
  distance?: number;
  online?: boolean;
};

type Props = {
  user: User;
  onLike?: (id: string) => void;
  onSkip?: (id: string) => void;
  compact?: boolean;
};

export function UserCard({ user, onLike, onSkip, compact = false }: Props) {
  const handlePress = () => {
    router.push(`/profile/${user.id}`);
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={handlePress}>
        <View style={styles.compactAvatar}>
          <Text style={styles.compactAvatarText}>{user.name.charAt(0)}</Text>
          {user.online && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactName}>{user.name}, {user.age}</Text>
          <Text style={styles.compactCity} numberOfLines={1}>{user.city}</Text>
        </View>
        {user.verified && (
          <Ionicons name="checkmark-circle" size={18} color="#4ECDC4" />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.9}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        {user.online && <View style={styles.onlineDot} />}
        {user.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={10} color="#FFF" />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          {user.distance !== undefined && (
            <Text style={styles.distance}>{user.distance} کم</Text>
          )}
        </View>
        <Text style={styles.city}>{user.city}</Text>
        {user.bio && (
          <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
        )}
        {user.interests && user.interests.length > 0 && (
          <View style={styles.interests}>
            {user.interests.slice(0, 3).map((i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{i}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Actions */}
      {(onLike || onSkip) && (
        <View style={styles.actions}>
          {onSkip && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.skipBtn]}
              onPress={() => onSkip(user.id)}
            >
              <Ionicons name="close" size={22} color="#888" />
            </TouchableOpacity>
          )}
          {onLike && (
            <TouchableOpacity
              style={[styles.actionBtn, styles.likeBtn]}
              onPress={() => onLike(user.id)}
            >
              <Ionicons name="heart" size={22} color="#FF6B9D" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213E',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  avatarContainer: { position: 'relative', alignSelf: 'center', marginBottom: 12 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 32, color: '#FFF', fontWeight: 'bold' },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#16213E',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4ECDC4',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#16213E',
  },
  info: { alignItems: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  distance: { fontSize: 12, color: '#888' },
  city: { fontSize: 13, color: '#888', marginBottom: 8 },
  bio: { fontSize: 13, color: '#CCC', textAlign: 'center', lineHeight: 20, marginBottom: 8 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
  tag: { backgroundColor: '#0F3460', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, color: '#4ECDC4' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 12 },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: { backgroundColor: '#2A2A4A' },
  likeBtn: { backgroundColor: '#FF6B9D22' },
  // Compact styles
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213E',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    marginBottom: 8,
  },
  compactAvatar: { position: 'relative' },
  compactAvatarInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactAvatarText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4ECDC4',
    textAlign: 'center',
    lineHeight: 44,
  },
  compactInfo: { flex: 1 },
  compactName: { fontSize: 15, fontWeight: 'bold', color: '#FFF' },
  compactCity: { fontSize: 12, color: '#888' },
});
