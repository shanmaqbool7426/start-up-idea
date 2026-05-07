import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { TOP_CLANS } from '@/constants/data';
import ClanCard from '@/components/ClanCard';
import LeaderboardRow from '@/components/LeaderboardRow';

const WAR_TIME = '1d 14h 32m';

const CLAN_MEMBERS = [
  { rank: 1, name: 'ZephyrX', clan: 'NW', xp: 24800, level: 67, change: 0 },
  { rank: 2, name: 'NeonViper', clan: 'NW', xp: 18200, level: 53, change: 1 },
  { rank: 3, name: 'Alex Cipher', clan: 'NW', xp: 7420, level: 34, change: 0, isUser: true },
  { rank: 4, name: 'ShadowX', clan: 'NW', xp: 6100, level: 29, change: 2 },
  { rank: 5, name: 'Maverick', clan: 'NW', xp: 5800, level: 27, change: -1 },
];

export default function ClansScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const [tab, setTab] = useState<'global' | 'members'>('global');
  const myClan = TOP_CLANS.find(c => c.isUserClan)!;

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Clans</Text>
        <TouchableOpacity style={styles.createBtn} activeOpacity={0.8}>
          <Ionicons name="add" size={16} color={COLORS.primary} />
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 100 }]}
      >
        <ClanCard clan={myClan} featured />

        <LinearGradient
          colors={[COLORS.red + '22', COLORS.card]}
          style={styles.warBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="flame" size={20} color={COLORS.red} />
          <View style={styles.warInfo}>
            <Text style={styles.warTitle}>City War Season 3 — ACTIVE</Text>
            <Text style={styles.warSub}>Ends in {WAR_TIME} · We're winning!</Text>
          </View>
          <TouchableOpacity style={styles.warBtn} activeOpacity={0.8}>
            <Text style={styles.warBtnText}>FIGHT</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'global' && styles.tabBtnActive]}
            onPress={() => setTab('global')}
          >
            <Text style={[styles.tabText, tab === 'global' && styles.tabTextActive]}>Global</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'members' && styles.tabBtnActive]}
            onPress={() => setTab('members')}
          >
            <Text style={[styles.tabText, tab === 'members' && styles.tabTextActive]}>Members</Text>
          </TouchableOpacity>
        </View>

        {tab === 'global' ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Clans</Text>
              <Text style={styles.sectionSub}>City Wide Ranking</Text>
            </View>
            {TOP_CLANS.map(clan => (
              <ClanCard key={clan.id} clan={clan} />
            ))}
          </>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Neon Wolves</Text>
              <Text style={styles.sectionSub}>48 members · Level 32</Text>
            </View>
            {CLAN_MEMBERS.map(member => (
              <LeaderboardRow key={member.rank} {...member} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.foreground,
    fontFamily: 'Orbitron_700Bold',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryDim,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  createText: { color: COLORS.primaryLight, fontSize: 13, fontWeight: '600' },
  scrollContent: { paddingHorizontal: 16 },
  warBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: COLORS.radius,
    padding: 14,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.red + '44',
  },
  warInfo: { flex: 1 },
  warTitle: { fontSize: 13, fontWeight: '700', color: COLORS.foreground },
  warSub: { fontSize: 11, color: COLORS.foregroundMuted },
  warBtn: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  warBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radius,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: COLORS.radiusSm,
  },
  tabBtnActive: { backgroundColor: COLORS.primaryDim },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.foregroundMuted },
  tabTextActive: { color: COLORS.primaryLight },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.foreground },
  sectionSub: { fontSize: 12, color: COLORS.foregroundMuted },
});
