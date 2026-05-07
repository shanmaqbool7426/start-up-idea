import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';
import { TERRITORIES } from '@/constants/data';
import { useGame } from '@/context/GameContext';
import HexGrid from '@/components/HexGrid';
import XPBar from '@/components/XPBar';

const { width: SCREEN_W } = Dimensions.get('window');

const TEAM_META: Record<string, { label: string; color: string }> = {
  user: { label: 'Neon Wolves', color: COLORS.primary },
  blue: { label: 'Storm Riders', color: '#3B82F6' },
  cyan: { label: 'Cyber Sharks', color: COLORS.accent },
  orange: { label: 'Iron Phoenix', color: COLORS.orange },
  red: { label: 'Blood Ravens', color: COLORS.red },
  green: { label: 'Green Serpents', color: COLORS.green },
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useGame();
  const [activeTerritory, setActiveTerritory] = useState<string | null>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleCapture = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={13} color={COLORS.orange} />
            <Text style={styles.streakText}>{user.streak}</Text>
          </View>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>{user.rank.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.appTitle}>LIFEGRID</Text>
        <View style={styles.topRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.xpBarWrap}>
        <XPBar xp={user.xp} maxXp={user.maxXp} level={user.level} />
      </View>

      <View style={styles.mapContainer}>
        <LinearGradient
          colors={['#0A0A0F', '#0F0A1A', '#0A0A0F']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.gridLines} />
        <View style={styles.mapInner}>
          <HexGrid />
        </View>

        <View style={styles.mapOverlayTop}>
          <View style={styles.liveDot}>
            <View style={styles.liveDotInner} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <TouchableOpacity style={styles.mapControl}>
            <Ionicons name="locate" size={18} color={COLORS.foreground} />
          </TouchableOpacity>
        </View>

        <View style={styles.legend}>
          {Object.entries(TEAM_META).map(([team, meta]) => (
            <TouchableOpacity
              key={team}
              style={styles.legendItem}
              onPress={() => setActiveTerritory(activeTerritory === team ? null : team)}
              activeOpacity={0.8}
            >
              <View style={[styles.legendDot, { backgroundColor: meta.color }]} />
              <Text style={styles.legendLabel} numberOfLines={1}>{meta.label.split(' ')[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.territoryScroll}
        style={styles.territoryRow}
      >
        {TERRITORIES.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tCard, { borderColor: TEAM_META[t.team]?.color + '66' ?? COLORS.border }]}
            activeOpacity={0.8}
          >
            <View style={[styles.tDot, { backgroundColor: TEAM_META[t.team]?.color ?? COLORS.border }]} />
            <Text style={styles.tName}>{t.name}</Text>
            <Text style={styles.tCount}>{t.hexCount} hex</Text>
            <Text style={[styles.tXp, { color: TEAM_META[t.team]?.color ?? COLORS.gold }]}>+{t.xp.toLocaleString()} XP</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.bottomActions, { paddingBottom: bottomPad + 88 }]}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Ionicons name="people-outline" size={18} color={COLORS.accent} />
          <Text style={[styles.actionText, { color: COLORS.accent }]}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureBtn} onPress={handleCapture} activeOpacity={0.85}>
          <LinearGradient colors={[COLORS.primaryLight, COLORS.primary]} style={styles.captureBtnInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Ionicons name="flag" size={24} color="#fff" />
            <Text style={styles.captureText}>CAPTURE</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Ionicons name="stats-chart-outline" size={18} color={COLORS.gold} />
          <Text style={[styles.actionText, { color: COLORS.gold }]}>Stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topLeft: { flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center' },
  topRight: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 4 },
  appTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.foreground,
    fontFamily: 'Orbitron_900Black',
    letterSpacing: 3,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.orange + '22',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 3,
  },
  streakText: { color: COLORS.orange, fontSize: 12, fontWeight: '700' },
  rankBadge: {
    backgroundColor: COLORS.gold + '22',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rankText: { color: COLORS.gold, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  iconBtn: { padding: 8 },
  xpBarWrap: { paddingHorizontal: 16, paddingBottom: 10 },
  mapContainer: {
    flex: 1,
    minHeight: 300,
    position: 'relative',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  gridLines: {
    position: 'absolute',
    inset: 0,
    borderWidth: 0,
    opacity: 0.03,
  },
  mapInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  mapOverlayTop: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.card + 'CC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  liveDotInner: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.red,
  },
  liveText: { color: COLORS.foreground, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  mapControl: {
    backgroundColor: COLORS.card + 'CC',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  legend: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    gap: 4,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 9, color: COLORS.foregroundMuted },
  territoryRow: { maxHeight: 100 },
  territoryScroll: { paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  tCard: {
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radiusSm,
    padding: 10,
    borderWidth: 1,
    minWidth: 130,
    gap: 3,
  },
  tDot: { width: 8, height: 8, borderRadius: 4 },
  tName: { fontSize: 12, fontWeight: '700', color: COLORS.foreground },
  tCount: { fontSize: 10, color: COLORS.foregroundMuted },
  tXp: { fontSize: 11, fontWeight: '600' },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 16,
  },
  actionBtn: { flex: 1, alignItems: 'center', gap: 4 },
  actionText: { fontSize: 11, fontWeight: '600' },
  captureBtn: { flex: 2 },
  captureBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: COLORS.radiusLg,
    gap: 8,
  },
  captureText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
});
