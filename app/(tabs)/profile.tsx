import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { ACHIEVEMENTS, LEADERBOARD, RANK_TIERS } from '@/constants/data';
import { useGame } from '@/context/GameContext';
import AvatarBadge from '@/components/AvatarBadge';
import XPBar from '@/components/XPBar';
import StatCard from '@/components/StatCard';
import AchievementBadge from '@/components/AchievementBadge';
import LeaderboardRow from '@/components/LeaderboardRow';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const { user } = useGame();
  const xpPercent = user.xp / user.maxXp;

  const currentRankIndex = RANK_TIERS.indexOf(user.rank);
  const nextRank = RANK_TIERS[currentRankIndex + 1] ?? 'MAX';

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 100 }]}
      >
        <LinearGradient
          colors={[COLORS.primaryDim + '88', COLORS.card]}
          style={styles.profileCard}
        >
          <View style={styles.profileTop}>
            <AvatarBadge
              letter={user.name[0]}
              level={user.level}
              size={88}
              showRing
              xpPercent={xpPercent}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileUsername}>{user.username}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{user.rank.toUpperCase()}</Text>
                </View>
                <View style={styles.clanBadge}>
                  <Ionicons name="shield" size={10} color={COLORS.primary} />
                  <Text style={styles.clanText}>{user.clan}</Text>
                </View>
              </View>
              <View style={styles.streakRow}>
                <Ionicons name="flame" size={14} color={COLORS.orange} />
                <Text style={styles.streakText}>{user.streak} day streak</Text>
              </View>
            </View>
          </View>

          <XPBar xp={user.xp} maxXp={user.maxXp} level={user.level} />

          <View style={styles.rankProgress}>
            <Text style={styles.rankProgressText}>
              {user.rank} → {nextRank}
            </Text>
            <Text style={styles.rankProgressSub}>
              {(user.maxXp - user.xp).toLocaleString()} XP to next rank
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <StatCard label="Territories" value={user.territories} icon="flag" color={COLORS.primary} />
          <StatCard label="Total XP" value={(user.xp + 60000).toLocaleString()} icon="flash" color={COLORS.gold} />
        </View>
        <View style={styles.statsGrid}>
          <StatCard label="Global Rank" value="#8" icon="trophy" color={COLORS.gold} sub="Top 1%" />
          <StatCard label="Day Streak" value={user.streak} icon="flame" color={COLORS.orange} sub="Personal best: 18" />
        </View>
        <View style={styles.statsGrid}>
          <StatCard label="Battles Won" value={124} icon="shield" color={COLORS.green} />
          <StatCard label="Steps Today" value="6,247" icon="footsteps" color={COLORS.accent} sub="Goal: 8,000" />
        </View>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementGrid}>
          {ACHIEVEMENTS.map(a => (
            <View key={a.id} style={styles.achieveItem}>
              <AchievementBadge achievement={a} size={60} />
              <Text style={styles.achieveLabel} numberOfLines={1}>{a.title}</Text>
              <Text style={[styles.achieveRarity, { color: a.rarity === 'legendary' ? COLORS.gold : a.rarity === 'epic' ? COLORS.primary : a.rarity === 'rare' ? COLORS.accent : COLORS.foregroundDim }]}>
                {a.rarity}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>City Leaderboard</Text>
        {LEADERBOARD.map(entry => (
          <LeaderboardRow key={entry.rank} {...entry} />
        ))}

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.red} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
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
  headerRight: { flexDirection: 'row', gap: 4 },
  iconBtn: { padding: 8 },
  scrollContent: { paddingHorizontal: 16 },
  profileCard: {
    borderRadius: COLORS.radiusLg,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  profileTop: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  profileInfo: { flex: 1, gap: 6 },
  profileName: { fontSize: 22, fontWeight: '800', color: COLORS.foreground },
  profileUsername: { fontSize: 13, color: COLORS.foregroundMuted },
  badgeRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  rankBadge: {
    backgroundColor: COLORS.goldDim,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  rankText: { color: COLORS.gold, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  clanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryDim,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  clanText: { color: COLORS.primaryLight, fontSize: 10, fontWeight: '600' },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakText: { fontSize: 12, color: COLORS.orange, fontWeight: '600' },
  rankProgress: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rankProgressText: { fontSize: 14, fontWeight: '700', color: COLORS.foreground },
  rankProgressSub: { fontSize: 11, color: COLORS.foregroundMuted },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.foreground, marginTop: 8, marginBottom: 14 },
  achievementGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 8 },
  achieveItem: { alignItems: 'center', gap: 5, width: 64 },
  achieveLabel: { fontSize: 9, color: COLORS.foregroundMuted, textAlign: 'center' },
  achieveRarity: { fontSize: 8, textTransform: 'uppercase', fontWeight: '600' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: COLORS.radius,
    backgroundColor: COLORS.red + '11',
    borderWidth: 1,
    borderColor: COLORS.red + '33',
  },
  logoutText: { fontSize: 15, color: COLORS.red, fontWeight: '600' },
});
