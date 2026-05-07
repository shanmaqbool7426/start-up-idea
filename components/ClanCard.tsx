import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { Clan } from '@/constants/data';

type Props = {
  clan: Clan;
  onPress?: () => void;
  featured?: boolean;
};

export default function ClanCard({ clan, onPress, featured = false }: Props) {
  const rankColor = clan.rank === 1 ? COLORS.gold : clan.rank === 2 ? '#94A3B8' : clan.rank === 3 ? '#B45309' : COLORS.foregroundMuted;

  if (featured) {
    return (
      <LinearGradient
        colors={[clan.color + '33', COLORS.card]}
        style={styles.featured}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.featuredTop}>
          <View style={[styles.clanIcon, { backgroundColor: clan.color + '33', borderColor: clan.color }]}>
            <Text style={[styles.clanTag, { color: clan.color }]}>{clan.tag}</Text>
          </View>
          <View style={styles.featuredInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.featuredName}>{clan.name}</Text>
              {clan.isUserClan && (
                <View style={styles.myBadge}><Text style={styles.myBadgeText}>MY CLAN</Text></View>
              )}
            </View>
            <Text style={styles.featuredSub}>Level {clan.level} • {clan.members} members</Text>
            <Text style={styles.featuredSub}>Rank #{clan.rank} Global</Text>
          </View>
        </View>
        <View style={styles.featuredStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: COLORS.gold }]}>{(clan.xp / 1000).toFixed(0)}K</Text>
            <Text style={styles.statLabel}>Clan XP</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: clan.color }]}>{clan.territories}</Text>
            <Text style={styles.statLabel}>Territories</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: COLORS.green }]}>{clan.members}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.rankWrap}>
        <Text style={[styles.rankNum, { color: rankColor }]}>#{clan.rank}</Text>
      </View>
      <View style={[styles.dot, { backgroundColor: clan.color }]} />
      <Text style={styles.name}>{clan.name}</Text>
      <View style={styles.spacer} />
      <Text style={styles.xp}>{(clan.xp / 1000).toFixed(0)}K XP</Text>
      <Text style={styles.territories}>{clan.territories} 🗺</Text>
      {clan.isUserClan && <View style={styles.myDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    marginBottom: 8,
  },
  rankWrap: { width: 28, alignItems: 'center' },
  rankNum: { fontSize: 13, fontWeight: '700' },
  dot: { width: 10, height: 10, borderRadius: 5 },
  name: { flex: 1, color: COLORS.foreground, fontSize: 15, fontWeight: '600' },
  spacer: { flex: 1 },
  xp: { color: COLORS.gold, fontSize: 12, fontWeight: '600' },
  territories: { fontSize: 12, color: COLORS.foregroundMuted, marginLeft: 8 },
  myDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  featured: {
    borderRadius: COLORS.radiusLg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  featuredTop: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  clanIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  clanTag: { fontSize: 18, fontWeight: '800' },
  featuredInfo: { flex: 1, justifyContent: 'center', gap: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featuredName: { fontSize: 20, fontWeight: '800', color: COLORS.foreground },
  featuredSub: { fontSize: 13, color: COLORS.foregroundMuted },
  myBadge: {
    backgroundColor: COLORS.primaryDim,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  myBadgeText: { color: COLORS.primaryLight, fontSize: 9, fontWeight: '700' },
  featuredStats: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statVal: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 11, color: COLORS.foregroundMuted },
  divider: { width: 1, height: 40, backgroundColor: COLORS.border },
});
