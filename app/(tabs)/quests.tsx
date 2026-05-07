import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';
import { DAILY_QUESTS, EVENTS, ACHIEVEMENTS } from '@/constants/data';
import QuestCard from '@/components/QuestCard';
import EventCard from '@/components/EventCard';
import AchievementBadge from '@/components/AchievementBadge';
import { useGame } from '@/context/GameContext';

const PASS_TIERS = [
  { label: 'Daily Login', done: true },
  { label: '5 Territories', done: true },
  { label: '10K Steps', done: false },
  { label: 'Win War', done: false },
  { label: 'Legend', done: false },
];

export default function QuestsScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const [tab, setTab] = useState<'daily' | 'events' | 'pass'>('daily');
  const { addXP } = useGame();

  const handleClaim = (xp: number) => {
    addXP(xp);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Quests</Text>
        <View style={styles.xpChip}>
          <Ionicons name="flash" size={13} color={COLORS.gold} />
          <Text style={styles.xpChipText}>Today +1,450 XP</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {(['daily', 'events', 'pass'] as const).map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            onPress={() => setTab(t)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'daily' ? 'Daily' : t === 'events' ? 'Events' : 'Battle Pass'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 100 }]}
      >
        {tab === 'daily' && (
          <>
            <View style={styles.sectionLabel}>
              <Ionicons name="calendar" size={14} color={COLORS.accent} />
              <Text style={styles.sectionText}>Resets in 6h 23m</Text>
              <Text style={styles.sectionCompleted}>3/6 done</Text>
            </View>
            {DAILY_QUESTS.map(q => (
              <QuestCard key={q.id} quest={q} onClaim={() => handleClaim(q.xpReward)} />
            ))}

            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementGrid}>
              {ACHIEVEMENTS.map(a => (
                <View key={a.id} style={styles.achieveItem}>
                  <AchievementBadge achievement={a} />
                  <Text style={styles.achieveLabel} numberOfLines={1}>{a.title}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {tab === 'events' && (
          <>
            <View style={styles.sectionLabel}>
              <Ionicons name="flame" size={14} color={COLORS.red} />
              <Text style={[styles.sectionText, { color: COLORS.red }]}>4 Active Events</Text>
            </View>
            {EVENTS.map(e => (
              <EventCard key={e.id} event={e} />
            ))}
          </>
        )}

        {tab === 'pass' && (
          <>
            <LinearGradient
              colors={[COLORS.gold + '33', COLORS.card]}
              style={styles.passBanner}
            >
              <Text style={styles.passBannerTitle}>Season 3 Battle Pass</Text>
              <Text style={styles.passBannerSub}>18 days remaining · 62% complete</Text>
              <View style={styles.passTrack}>
                {PASS_TIERS.map((tier, i) => (
                  <View key={i} style={styles.passTier}>
                    <View style={[styles.passNode, tier.done && styles.passNodeDone]}>
                      {tier.done
                        ? <Ionicons name="checkmark" size={12} color="#fff" />
                        : <Text style={styles.passNodeNum}>{i + 1}</Text>
                      }
                    </View>
                    {i < PASS_TIERS.length - 1 && (
                      <View style={[styles.passLine, tier.done && styles.passLineDone]} />
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.passLabels}>
                {PASS_TIERS.map((tier, i) => (
                  <Text key={i} style={[styles.passTierLabel, { color: tier.done ? COLORS.gold : COLORS.foregroundDim }]} numberOfLines={1}>
                    {tier.label}
                  </Text>
                ))}
              </View>
            </LinearGradient>

            <Text style={styles.sectionTitle}>Season Rewards</Text>
            {[
              { tier: 1, reward: 'Neon Wolf Skin', xp: 500, done: true },
              { tier: 2, reward: 'Territory Glow Effect', xp: 1000, done: true },
              { tier: 3, reward: 'Diamond Avatar Frame', xp: 2500, done: false },
              { tier: 4, reward: 'Legendary Clan Banner', xp: 5000, done: false },
              { tier: 5, reward: 'Season Champion Title', xp: 10000, done: false },
            ].map(r => (
              <View key={r.tier} style={[styles.rewardRow, r.done && styles.rewardDone]}>
                <View style={[styles.rewardTier, { backgroundColor: r.done ? COLORS.gold + '33' : COLORS.card }]}>
                  <Text style={[styles.rewardTierNum, { color: r.done ? COLORS.gold : COLORS.foregroundMuted }]}>T{r.tier}</Text>
                </View>
                <Text style={[styles.rewardName, { color: r.done ? COLORS.foreground : COLORS.foregroundMuted }]}>{r.reward}</Text>
                <View style={styles.xpBadge}>
                  <Ionicons name="flash" size={10} color={COLORS.gold} />
                  <Text style={styles.xpBadgeText}>{r.xp.toLocaleString()}</Text>
                </View>
                {r.done && <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />}
              </View>
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
  xpChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.goldDim,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  xpChipText: { color: COLORS.gold, fontSize: 12, fontWeight: '600' },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    borderRadius: COLORS.radius,
    padding: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: COLORS.radiusSm,
  },
  tabBtnActive: { backgroundColor: COLORS.primaryDim },
  tabText: { fontSize: 12, fontWeight: '600', color: COLORS.foregroundMuted },
  tabTextActive: { color: COLORS.primaryLight },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12 },
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionText: { flex: 1, fontSize: 13, color: COLORS.foregroundMuted },
  sectionCompleted: { fontSize: 13, color: COLORS.green, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.foreground, marginBottom: 12, marginTop: 8 },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  achieveItem: { alignItems: 'center', gap: 6 },
  achieveLabel: { fontSize: 9, color: COLORS.foregroundMuted, textAlign: 'center', maxWidth: 56 },
  passBanner: {
    borderRadius: COLORS.radiusLg,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gold + '44',
    gap: 12,
  },
  passBannerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.gold },
  passBannerSub: { fontSize: 12, color: COLORS.foregroundMuted },
  passTrack: { flexDirection: 'row', alignItems: 'center' },
  passTier: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  passNode: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passNodeDone: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  passNodeNum: { fontSize: 11, color: COLORS.foregroundMuted, fontWeight: '700' },
  passLine: { flex: 1, height: 2, backgroundColor: COLORS.border },
  passLineDone: { backgroundColor: COLORS.gold },
  passLabels: { flexDirection: 'row' },
  passTierLabel: { flex: 1, fontSize: 9, textAlign: 'center' },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radiusSm,
    padding: 12,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rewardDone: { borderColor: COLORS.green + '44' },
  rewardTier: {
    width: 36,
    height: 36,
    borderRadius: COLORS.radiusSm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardTierNum: { fontSize: 12, fontWeight: '700' },
  rewardName: { flex: 1, fontSize: 14, fontWeight: '600' },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  xpBadgeText: { fontSize: 11, color: COLORS.gold, fontWeight: '600' },
});
