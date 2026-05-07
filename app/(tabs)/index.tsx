import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { CURRENT_USER, CLUB_LEADERBOARD } from '@/constants/data';
import CityMap from '@/components/CityMap';

type MapTab = 'territories' | 'single' | 'club';

export default function PlayScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 52 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 0 : insets.bottom;
  const [mapTab, setMapTab] = useState<MapTab>('single');

  return (
    <View style={styles.root}>
      {/* Full-screen map fills everything */}
      <CityMap />

      {/* Top overlay — segmented control + user bar */}
      <View style={[styles.topOverlay, { paddingTop: topPad + 10 }]}>
        {/* Segmented pill control */}
        <View style={styles.segmentRow}>
          {(['territories', 'single', 'club'] as MapTab[]).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.segBtn, mapTab === tab && styles.segBtnActive]}
              onPress={() => setMapTab(tab)}
              activeOpacity={0.85}
            >
              <Text style={[styles.segText, mapTab === tab && styles.segTextActive]}>
                {tab === 'territories' ? 'My Territories' : tab === 'single' ? 'Single Player' : 'My Club'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* User info bar */}
        <View style={styles.userBar}>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.foreground} />
          </TouchableOpacity>

          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{CURRENT_USER.avatar}</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{CURRENT_USER.name}</Text>
            <View style={styles.userMeta}>
              <Ionicons name="shield-checkmark" size={10} color={COLORS.gold} />
              <Text style={styles.userTitle}>KING OF THE AREA</Text>
              <Ionicons name="shield-checkmark" size={10} color={COLORS.gold} />
            </View>
          </View>

          <Text style={styles.territory}>{CURRENT_USER.territory}KM²</Text>

          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>L{CURRENT_USER.level}</Text>
          </View>
        </View>
      </View>

      {/* My Club slide-up panel */}
      {mapTab === 'club' && (
        <View style={[styles.clubPanel, { paddingBottom: bottomPad + 96 }]}>
          <View style={styles.panelHandle} />
          <Text style={styles.panelTitle}>My Club</Text>

          <View style={styles.clubHeader}>
            <View style={styles.clubIcon}>
              <Text style={styles.clubIconText}>NW</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.clubName}>Neon Wolves</Text>
              <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
            </View>
            <View style={styles.clubStats}>
              <View style={styles.clubStatItem}>
                <Text style={styles.clubStatVal}>718.7KM²</Text>
                <Text style={styles.clubStatLabel}>Territory</Text>
              </View>
              <View style={styles.clubStatItem}>
                <Text style={styles.clubStatVal}>162</Text>
                <Text style={styles.clubStatLabel}>Members</Text>
              </View>
            </View>
          </View>

          <View style={styles.lbTabRow}>
            {['Leaderboard', 'Territories', 'History'].map(t => (
              <TouchableOpacity key={t} style={[styles.lbTab, t === 'Leaderboard' && styles.lbTabActive]}>
                <Text style={[styles.lbTabText, t === 'Leaderboard' && styles.lbTabTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {CLUB_LEADERBOARD.map(club => (
              <View key={club.rank} style={[styles.lbRow, { backgroundColor: club.color }]}>
                <Text style={styles.lbRank}>{club.rank}</Text>
                <Text style={styles.lbFlag}>{club.flagEmoji}</Text>
                <Text style={styles.lbName} numberOfLines={1}>{club.name}</Text>
                <Text style={styles.lbTerritory}>{club.territory}KM²</Text>
                {club.isMine && <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} />}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Capture indicator */}
      {mapTab !== 'club' && (
        <View style={[styles.captureIndicator, { bottom: bottomPad + 96 }]}>
          <Ionicons name="location" size={13} color={COLORS.primary} />
          <Text style={styles.captureText}>
            {mapTab === 'territories' ? 'Your territory: 23.4KM²' : 'Move to capture territory'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.mapBg },

  topOverlay: {
    paddingHorizontal: 12,
    gap: 10,
  },

  segmentRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 26,
    padding: 3,
    alignSelf: 'center',
  },
  segBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 24,
  },
  segBtnActive: { backgroundColor: COLORS.foreground },
  segText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.55)' },
  segTextActive: { color: '#111', fontWeight: '700' },

  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.82)',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 9,
  },
  bellBtn: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userAvatarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  userInfo: { flex: 1, gap: 1 },
  userName: { color: '#fff', fontWeight: '700', fontSize: 13 },
  userMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  userTitle: { color: COLORS.gold, fontSize: 8, fontWeight: '800', letterSpacing: 0.4 },
  territory: { color: '#fff', fontWeight: '800', fontSize: 14 },
  levelBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: { color: '#fff', fontSize: 11, fontWeight: '800' },

  captureIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.78)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.primary + '55',
  },
  captureText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  clubPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    maxHeight: '65%',
  },
  panelHandle: {
    width: 36, height: 4,
    backgroundColor: COLORS.borderLight,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  panelTitle: { fontSize: 16, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 14 },
  clubHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  clubIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  clubIconText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  clubName: { color: '#fff', fontWeight: '700', fontSize: 14 },
  changeText: { color: COLORS.primary, fontSize: 11, marginTop: 2 },
  clubStats: { flexDirection: 'row', gap: 16 },
  clubStatItem: { alignItems: 'flex-end' },
  clubStatVal: { color: '#fff', fontWeight: '800', fontSize: 15 },
  clubStatLabel: { color: COLORS.foregroundMuted, fontSize: 10 },
  lbTabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.border, marginBottom: 8 },
  lbTab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  lbTabActive: { borderBottomWidth: 2, borderBottomColor: '#fff' },
  lbTabText: { fontSize: 13, color: COLORS.foregroundMuted, fontWeight: '600' },
  lbTabTextActive: { color: '#fff' },
  lbRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 11,
    marginBottom: 2, borderRadius: 4, gap: 10,
  },
  lbRank: { color: '#fff', fontWeight: '700', fontSize: 13, width: 20 },
  lbFlag: { fontSize: 15 },
  lbName: { flex: 1, color: '#fff', fontSize: 13, fontWeight: '500' },
  lbTerritory: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
