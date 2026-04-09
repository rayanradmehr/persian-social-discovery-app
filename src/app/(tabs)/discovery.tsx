import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDiscoveryStore } from '@/stores/discoveryStore';
import { useTheme } from '@/shared/hooks/useTheme';
import { GlassCard } from '@/shared/components/GlassCard';
import { Button } from '@/shared/components/Button';
import { Avatar } from '@/shared/components/Avatar';

export default function DiscoveryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { status, currentMatch, startSearching, stopSearching, acceptMatch, declineMatch } =
    useDiscoveryStore();

  // Pulsing animation for search state
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status === 'searching') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [status, pulseAnim]);

  const handleAccept = async () => {
    if (currentMatch) {
      await acceptMatch(currentMatch.matchId);
      router.push(`/chat/${currentMatch.matchId}`);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: 'Vazirmatn-Bold' }]}>
          کشف ناشناخته
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: 'Vazirmatn-Regular' }]}>
          با افراد جدید آشنا شو
        </Text>
      </View>

      {/* Main content area */}
      <View style={styles.content}>
        {/* IDLE STATE */}
        {status === 'idle' && (
          <View style={styles.idleContainer}>
            <Avatar size="xl" anonymousMode />
            <Text style={[styles.idleText, { color: theme.colors.textSecondary, fontFamily: 'Vazirmatn-Medium' }]}>
              برای شروع کشف، دکمه دل بزن
            </Text>
            <Button label="شروع به کشف" onPress={startSearching} size="lg" fullWidth style={styles.btn} />
          </View>
        )}

        {/* SEARCHING STATE */}
        {status === 'searching' && (
          <View style={styles.searchingContainer}>
            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }], borderColor: theme.colors.primary + '40' }]} />
            <View style={[styles.pulseCore, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.pulseEmoji}>❤️</Text>
            </View>
            <Text style={[styles.searchingText, { color: theme.colors.text, fontFamily: 'Vazirmatn-SemiBold' }]}>
              در حال جستجوی هم...
            </Text>
            <Button label="لغو" onPress={stopSearching} variant="ghost" />
          </View>
        )}

        {/* MATCHED STATE */}
        {status === 'matched' && currentMatch && (
          <GlassCard style={styles.matchCard}>
            <Avatar size="xl" anonymousMode />
            <Text style={[styles.matchAlias, { color: theme.colors.text, fontFamily: 'Vazirmatn-Bold' }]}>
              {currentMatch.anonymousAlias}
            </Text>
            <Text style={[styles.matchScore, { color: theme.colors.primary, fontFamily: 'Vazirmatn-SemiBold' }]}>
              {Math.round(currentMatch.compatibilityScore * 100)}% سازگاری
            </Text>
            {currentMatch.sharedInterests.length > 0 && (
              <Text style={[styles.interests, { color: theme.colors.textSecondary }]}>
                علایق مشترک: {currentMatch.sharedInterests.slice(0, 3).join(' • ')}
              </Text>
            )}
            <View style={styles.matchActions}>
              <Button
                label="قبول ❤️"
                onPress={handleAccept}
                size="lg"
                style={{ flex: 1 }}
              />
              <Button
                label="بعدی"
                onPress={() => declineMatch(currentMatch.matchId)}
                variant="ghost"
                size="lg"
                style={{ flex: 1 }}
              />
            </View>
          </GlassCard>
        )}

        {/* CONNECTING STATE */}
        {status === 'connecting' && (
          <View style={styles.connectingContainer}>
            <Text style={[styles.connectingText, { color: theme.colors.text, fontFamily: 'Vazirmatn-Bold' }]}>
              در حال اتصال...
            </Text>
          </View>
        )}
      </View>
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
  subtitle: { fontSize: 14, marginTop: 4 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  idleContainer: { alignItems: 'center', gap: 24 },
  idleText: { fontSize: 16, textAlign: 'center' },
  btn: { marginTop: 8 },
  searchingContainer: { alignItems: 'center', gap: 32 },
  pulseRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
  },
  pulseCore: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseEmoji: { fontSize: 48 },
  searchingText: { fontSize: 18 },
  matchCard: { width: '100%', alignItems: 'center', gap: 16, padding: 28 },
  matchAlias: { fontSize: 22, marginTop: 8 },
  matchScore: { fontSize: 16 },
  interests: { fontSize: 13, textAlign: 'center' },
  matchActions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 8 },
  connectingContainer: { alignItems: 'center' },
  connectingText: { fontSize: 20 },
});
