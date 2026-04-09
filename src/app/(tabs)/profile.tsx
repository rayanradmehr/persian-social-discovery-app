import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const MOCK_USER = {
  id: '1',
  name: 'رایان رادمهر',
  age: 28,
  bio: 'علاقه‌مند به موسیقی، سفر و آشپزی. دنبال دوستان جدید می‌گردم.',
  city: 'تهران',
  interests: ['موسیقی', 'سفر', 'آشپزی', 'کتاب', 'ورزش'],
  verified: true,
  premium: false,
  matchCount: 47,
  likeCount: 128,
};

type SettingItem = {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onPress?: () => void;
  onToggle?: (v: boolean) => void;
  danger?: boolean;
};

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showAge, setShowAge] = useState(true);

  const settingSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'حساب کاربری',
      items: [
        {
          icon: 'person-outline',
          label: 'ویرایش پروفایل',
          value: '',
          onPress: () => Alert.alert('ویرایش پروفایل', 'به زودی...'),
        },
        {
          icon: 'shield-checkmark-outline',
          label: 'تایید هویت',
          value: MOCK_USER.verified ? 'تایید شده' : 'تایید نشده',
          onPress: () => Alert.alert('تایید هویت'),
        },
        {
          icon: 'star-outline',
          label: 'پرمیوم',
          value: MOCK_USER.premium ? 'فعال' : 'غیرفعال',
          onPress: () => Alert.alert('پرمیوم', 'به زودی...'),
        },
      ],
    },
    {
      title: 'اعلان‌ها',
      items: [
        {
          icon: 'notifications-outline',
          label: 'اعلان‌های پیام',
          toggle: true,
          toggleValue: notifications,
          onToggle: setNotifications,
        },
      ],
    },
    {
      title: 'حریم خصوصی',
      items: [
        {
          icon: 'location-outline',
          label: 'اشتراک موقعیت',
          toggle: true,
          toggleValue: locationEnabled,
          onToggle: setLocationEnabled,
        },
        {
          icon: 'eye-outline',
          label: 'نمایش سن',
          toggle: true,
          toggleValue: showAge,
          onToggle: setShowAge,
        },
      ],
    },
    {
      title: '',
      items: [
        {
          icon: 'log-out-outline',
          label: 'خروج از حساب',
          danger: true,
          onPress: () =>
            Alert.alert('خروج', 'آیا مطمئن هستید؟', [
              { text: 'لغو', style: 'cancel' },
              { text: 'خروج', style: 'destructive', onPress: () => router.replace('/') },
            ]),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>پروفایل</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {MOCK_USER.name.charAt(0)}
              </Text>
            </View>
            {MOCK_USER.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={10} color="#FFF" />
              </View>
            )}
          </View>
          <Text style={styles.name}>{MOCK_USER.name}</Text>
          <Text style={styles.city}>
            <Ionicons name="location-outline" size={14} color="#888" />
            {' '}{MOCK_USER.city} · {MOCK_USER.age} ساله
          </Text>
          <Text style={styles.bio}>{MOCK_USER.bio}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{MOCK_USER.matchCount}</Text>
              <Text style={styles.statLabel}>مچ</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{MOCK_USER.likeCount}</Text>
              <Text style={styles.statLabel}>لایک</Text>
            </View>
          </View>

          {/* Interests */}
          <View style={styles.interestsContainer}>
            {MOCK_USER.interests.map((interest) => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        {settingSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            {section.title ? (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            ) : null}
            <View style={styles.sectionCard}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[
                    styles.settingItem,
                    iIndex < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                  onPress={item.onPress}
                  disabled={item.toggle}
                >
                  <View style={styles.settingLeft}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.danger ? '#FF3B30' : '#4ECDC4'}
                    />
                    <Text
                      style={[
                        styles.settingLabel,
                        item.danger && styles.dangerText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {item.toggle ? (
                    <Switch
                      value={item.toggleValue}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#3A3A3A', true: '#4ECDC4' }}
                      thumbColor="#FFF"
                    />
                  ) : item.value ? (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  ) : (
                    <Ionicons name="chevron-forward" size={16} color="#666" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.version}>نسخه ۱.۰.۰</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF', textAlign: 'right' },
  profileCard: {
    backgroundColor: '#16213E',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 32, color: '#FFF', fontWeight: 'bold' },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
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
  name: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  city: { fontSize: 14, color: '#888', marginBottom: 12 },
  bio: { fontSize: 14, color: '#CCC', textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  statItem: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#4ECDC4' },
  statLabel: { fontSize: 12, color: '#888' },
  statDivider: { width: 1, height: 32, backgroundColor: '#2A2A4A' },
  interestsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  interestTag: {
    backgroundColor: '#0F3460',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  interestText: { fontSize: 12, color: '#4ECDC4' },
  section: { paddingHorizontal: 16, marginBottom: 8 },
  sectionTitle: { fontSize: 13, color: '#888', marginBottom: 8, marginRight: 4, textAlign: 'right' },
  sectionCard: { backgroundColor: '#16213E', borderRadius: 16, overflow: 'hidden' },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingItemBorder: { borderBottomWidth: 0.5, borderBottomColor: '#2A2A4A' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingLabel: { fontSize: 15, color: '#FFF' },
  dangerText: { color: '#FF3B30' },
  settingValue: { fontSize: 13, color: '#888' },
  footer: { alignItems: 'center', paddingVertical: 24 },
  version: { fontSize: 12, color: '#444' },
});
