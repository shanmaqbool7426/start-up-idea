import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { CURRENT_USER, BATTLES } from '@/constants/data';

function DonutChart({ winning, draw, losing }: { winning: number; draw: number; losing: number }) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;
  const stroke = 22;

  const circumference = 2 * Math.PI * r;
  const winningDash = (winning / 100) * circumference;
  const drawDash = (draw / 100) * circumference;
  const losingDash = (losing / 100) * circumference;
  const winningOffset = 0;
  const drawOffset = -winningDash;
  const losingOffset = -(winningDash + drawDash);

  return (
    <View style={{ alignItems: 'center', marginBottom: 8 }}>
      <Svg width={size} height={size}>
        {/* Background */}
        <Circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.cardAlt} strokeWidth={stroke} />
        {/* Losing (gray) */}
        <Circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#555"
          strokeWidth={stroke}
          strokeDasharray={`${losingDash} ${circumference}`}
          strokeDashoffset={losingOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Draw (dark) */}
        <Circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#333"
          strokeWidth={stroke}
          strokeDasharray={`${drawDash} ${circumference}`}
          strokeDashoffset={drawOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Winning (pink) */}
        <Circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={stroke}
          strokeDasharray={`${winningDash} ${circumference}`}
          strokeDashoffset={winningOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </Svg>
    </View>
  );
}

function BattleRow({ battle }: { battle: typeof BATTLES[0] }) {
  const total = battle.myCount + battle.theirCount;
  const myPct = battle.myCount / total;

  return (
    <View style={styles.battleRow}>
      <View style={styles.battleLeft}>
        <View style={[styles.battleAvatar, { backgroundColor: battle.myColor }]}>
          <Text style={styles.battleAvatarText}>{CURRENT_USER.avatar}</Text>
        </View>
        <Text style={styles.battleCount}>{battle.myCount}</Text>
      </View>
      <View style={styles.battleBar}>
        <View style={[styles.battleBarFill, { flex: battle.myCount, backgroundColor: battle.myColor }]} />
        <View style={[styles.battleBarFill, { flex: battle.theirCount, backgroundColor: battle.theirColor }]} />
      </View>
      <View style={styles.battleRight}>
        <Text style={styles.battleCount}>{battle.theirCount}</Text>
        <View style={[styles.battleAvatar, { backgroundColor: battle.theirColor }]}>
          <Text style={styles.battleAvatarText}>{battle.opponentAvatar}</Text>
        </View>
      </View>
    </View>
  );
}

export default function MeScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const [activeTab, setActiveTab] = useState<'comp' | 'battles'>('comp');

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color={COLORS.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ME</Text>
        <View style={[styles.headerAvatar, { backgroundColor: COLORS.primary }]}>
          <Text style={styles.headerAvatarText}>{CURRENT_USER.avatar}</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab('comp')}>
          <Text style={[styles.tabText, activeTab === 'comp' && styles.tabTextActive]}>Competition</Text>
          {activeTab === 'comp' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab('battles')}>
          <Text style={[styles.tabText, activeTab === 'battles' && styles.tabTextActive]}>Local Battles</Text>
          {activeTab === 'battles' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 96 }]}
      >
        {activeTab === 'comp' ? (
          <>
            <Text style={styles.compTitle}>TERRA COMP 25.3</Text>
            <Text style={styles.compSub}>Competition has ended</Text>

            {/* Countdown */}
            <View style={styles.countdown}>
              {['00', '00', '00', '00'].map((v, i) => (
                <View key={i} style={styles.countdownItem}>
                  <View style={styles.countdownBox}>
                    <Text style={styles.countdownNum}>{v}</Text>
                  </View>
                  <Text style={styles.countdownLabel}>
                    {['Days', 'Hours', 'Minutes', 'Seconds'][i]}
                  </Text>
                </View>
              ))}
            </View>

            {/* Prizes podium */}
            <View style={styles.podium}>
              <View style={styles.podiumPlace2}>
                <Text style={styles.podiumLabel}>2nd place</Text>
                <View style={styles.podiumBox}>
                  <Ionicons name="watch-outline" size={28} color={COLORS.foregroundMuted} />
                  <Text style={styles.podiumBrand}>WHOOP</Text>
                  <Text style={styles.podiumItem}>Whoop band</Text>
                </View>
              </View>
              <View style={styles.podiumPlace1}>
                <Text style={styles.podiumLabel1}>1st place</Text>
                <View style={[styles.podiumBox, styles.podiumBox1]}>
                  <Ionicons name="watch" size={36} color={COLORS.gold} />
                  <Text style={styles.podiumBrand}>WHOOP</Text>
                  <Text style={styles.podiumItem}>Whoop band</Text>
                </View>
              </View>
              <View style={styles.podiumPlace3}>
                <Text style={styles.podiumLabel}>3rd place</Text>
                <View style={styles.podiumBox}>
                  <Ionicons name="watch-outline" size={28} color={COLORS.foregroundMuted} />
                  <Text style={styles.podiumBrand}>WHOOP</Text>
                  <Text style={styles.podiumItem}>Whoop band</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.viewAllPrizesBtn} activeOpacity={0.8}>
              <Text style={styles.viewAllPrizesText}>View all prizes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewWinnersBtn} activeOpacity={0.8}>
              <Text style={styles.viewWinnersText}>View winners</Text>
            </TouchableOpacity>

            <View style={styles.vaultRow}>
              <TouchableOpacity style={styles.vaultBtn}>
                <Text style={styles.vaultText}>Entry vault</Text>
                <Ionicons name="lock-open-outline" size={16} color={COLORS.foreground} />
              </TouchableOpacity>
            </View>

            <View style={styles.territoryInfo}>
              <Text style={styles.territoryInfoLabel}>Your territory for this competition is</Text>
              <Text style={styles.territoryInfoVal}>{CURRENT_USER.territory}KM²</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.battlesHeader}>
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={22} color={COLORS.foreground} />
              </TouchableOpacity>
              <Text style={styles.battlesTitle}>LOCAL BATTLES</Text>
              <View style={{ width: 22 }} />
            </View>

            <DonutChart winning={69} draw={6} losing={25} />

            <View style={styles.winStats}>
              <View style={styles.winStat}>
                <View style={styles.winStatDot} />
                <Text style={styles.winPct}>69%</Text>
                <Text style={styles.winLabel}>Winning</Text>
              </View>
              <View style={styles.winStat}>
                <View style={[styles.winStatDot, { backgroundColor: '#333' }]} />
                <Text style={styles.winPct}>6%</Text>
                <Text style={styles.winLabel}>Draw</Text>
              </View>
              <View style={styles.winStat}>
                <View style={[styles.winStatDot, { backgroundColor: '#555' }]} />
                <Text style={styles.winPct}>25%</Text>
                <Text style={styles.winLabel}>Losing</Text>
              </View>
            </View>

            <View style={styles.battleToggle}>
              <TouchableOpacity style={[styles.toggleBtn, styles.toggleBtnActive]}>
                <Text style={[styles.toggleText, styles.toggleTextActive]}>Count</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toggleBtn}>
                <Text style={styles.toggleText}>Total area</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.battleSubtitle}>Times territory stolen</Text>

            {BATTLES.map(b => (
              <View key={b.id}>
                <BattleRow battle={b} />
                <View style={styles.battleNames}>
                  <Text style={styles.battleName}>{CURRENT_USER.name}</Text>
                  <Text style={styles.battleName}>{b.opponent}</Text>
                </View>
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
  headerTitle: { fontSize: 16, fontWeight: '800', color: COLORS.foreground, letterSpacing: 2 },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 12, position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.foregroundMuted },
  tabTextActive: { color: COLORS.foreground },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: COLORS.foreground,
    borderRadius: 1,
  },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },
  compTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.foreground,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 4,
  },
  compSub: { fontSize: 12, color: COLORS.foregroundMuted, textAlign: 'center', marginBottom: 20 },
  countdown: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 24 },
  countdownItem: { alignItems: 'center', gap: 4 },
  countdownBox: {
    width: 60,
    height: 56,
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radiusSm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNum: { fontSize: 24, fontWeight: '800', color: COLORS.foreground },
  countdownLabel: { fontSize: 10, color: COLORS.foregroundMuted },
  podium: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 20 },
  podiumPlace1: { alignItems: 'center', flex: 1.2 },
  podiumPlace2: { alignItems: 'center', flex: 1 },
  podiumPlace3: { alignItems: 'center', flex: 1 },
  podiumLabel: { fontSize: 10, color: COLORS.foregroundMuted, marginBottom: 6 },
  podiumLabel1: { fontSize: 10, color: COLORS.gold, marginBottom: 6 },
  podiumBox: {
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radiusSm,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  podiumBox1: {
    borderWidth: 1,
    borderColor: COLORS.gold + '44',
    backgroundColor: COLORS.cardAlt,
  },
  podiumBrand: { fontSize: 12, fontWeight: '700', color: COLORS.foreground },
  podiumItem: { fontSize: 10, color: COLORS.foregroundMuted },
  viewAllPrizesBtn: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: COLORS.radiusSm,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllPrizesText: { fontSize: 15, fontWeight: '600', color: COLORS.foreground },
  viewWinnersBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: COLORS.radiusSm,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  viewWinnersText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  vaultRow: { alignItems: 'center', marginBottom: 16 },
  vaultBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 16, borderRadius: COLORS.radiusSm, backgroundColor: COLORS.card },
  vaultText: { fontSize: 14, fontWeight: '600', color: COLORS.foreground },
  territoryInfo: { alignItems: 'center', paddingBottom: 20 },
  territoryInfoLabel: { fontSize: 12, color: COLORS.foregroundMuted, marginBottom: 4 },
  territoryInfoVal: { fontSize: 32, fontWeight: '800', color: COLORS.foreground },
  battlesHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  battlesTitle: { fontSize: 15, fontWeight: '800', color: COLORS.foreground, letterSpacing: 1 },
  winStats: { flexDirection: 'row', justifyContent: 'center', gap: 28, marginBottom: 16 },
  winStat: { alignItems: 'center', gap: 4 },
  winStatDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  winPct: { fontSize: 20, fontWeight: '800', color: COLORS.foreground },
  winLabel: { fontSize: 11, color: COLORS.foregroundMuted },
  battleToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  toggleBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20 },
  toggleBtnActive: { backgroundColor: COLORS.cardAlt },
  toggleText: { fontSize: 12, color: COLORS.foregroundMuted, fontWeight: '600' },
  toggleTextActive: { color: COLORS.foreground },
  battleSubtitle: { fontSize: 11, color: COLORS.foregroundMuted, textAlign: 'center', marginBottom: 12 },
  battleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  battleLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  battleRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  battleAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  battleAvatarText: { color: '#fff', fontWeight: '700', fontSize: 11 },
  battleBar: { flex: 1, height: 28, flexDirection: 'row', borderRadius: 4, overflow: 'hidden' },
  battleBarFill: { height: '100%' },
  battleCount: { fontSize: 13, fontWeight: '700', color: COLORS.foreground, minWidth: 14, textAlign: 'center' },
  battleNames: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  battleName: { fontSize: 11, color: COLORS.foregroundMuted },
});
