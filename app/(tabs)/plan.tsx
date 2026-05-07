import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { WEEK_PLAN, CURRENT_USER, WeekDay } from '@/constants/data';

const STATUS_COLORS: Record<WeekDay['status'], string> = {
  rest: COLORS.foregroundDim,
  next: COLORS.primary,
  completed: COLORS.green,
  upcoming: COLORS.gold,
};

const STATUS_LABELS: Record<WeekDay['status'], string> = {
  rest: '',
  next: 'NEXT',
  completed: 'COMPLETED',
  upcoming: 'UPCOMING',
};

function DayRow({ day }: { day: WeekDay }) {
  const isRest = day.status === 'rest';
  const statusColor = STATUS_COLORS[day.status];

  return (
    <View style={[styles.dayRow, day.status === 'next' && styles.dayRowHighlight]}>
      <View style={styles.dayLeft}>
        <Text style={[styles.dayName, !isRest && { color: COLORS.foreground }]}>{day.day}</Text>
        <Text style={styles.dayDate}>{day.date}</Text>
      </View>
      <View style={styles.dayCenter}>
        {!isRest && day.distance ? (
          <>
            {day.status !== 'rest' && (
              <Text style={[styles.dayStatus, { color: statusColor }]}>
                {STATUS_LABELS[day.status]}
              </Text>
            )}
            <Text style={[styles.dayDistance, day.status === 'next' && { color: COLORS.foreground }]}>
              {day.distance}
            </Text>
            <Text style={styles.dayRunType}>{day.runType}</Text>
          </>
        ) : (
          <Text style={styles.restText}>Rest day</Text>
        )}
      </View>
      <TouchableOpacity style={[styles.dayAction, { backgroundColor: isRest ? COLORS.cardAlt : day.status === 'completed' ? 'transparent' : COLORS.foreground }]}>
        {day.status === 'completed' ? (
          <Ionicons name="checkmark" size={16} color={COLORS.green} />
        ) : day.status === 'next' ? (
          <Ionicons name="arrow-forward" size={16} color={COLORS.background} />
        ) : (
          <Ionicons name="play" size={14} color={isRest ? COLORS.foregroundDim : COLORS.background} />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function PlanScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>PLAN</Text>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>{CURRENT_USER.avatar}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 96 }]}
      >
        {/* Next run hero */}
        <View style={styles.nextRunSection}>
          <View style={styles.nextRunLeft}>
            <Text style={styles.nextRunLabel}>Next run</Text>
            <Text style={styles.nextRunMeta}>Light Run</Text>
            <Text style={styles.nextRunMeta}>Distance</Text>
          </View>
          <View style={styles.nextRunRight}>
            <Text style={styles.nextRunDate}>WED 28TH</Text>
            <Text style={styles.nextRunDistance}>4.6KM</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startBtn} activeOpacity={0.88}>
          <Text style={styles.startBtnText}>Start your run</Text>
        </TouchableOpacity>

        {/* Completed run */}
        <View style={styles.completedRow}>
          <Text style={styles.completedDay}>THU</Text>
          <Text style={styles.completedStat}>4.54KM</Text>
          <Text style={styles.completedStat}>29:47</Text>
          <Text style={styles.completedStat}>6:33/KM</Text>
        </View>

        {/* Weekly plan card */}
        <View style={styles.weekCard}>
          <View style={styles.weekCardHeader}>
            <Text style={styles.weekCardTitle}>Your plan this week</Text>
            <TouchableOpacity style={styles.reorderBtn}>
              <Text style={styles.reorderText}>Reorder week</Text>
              <Ionicons name="grid-outline" size={14} color={COLORS.foregroundMuted} />
            </TouchableOpacity>
          </View>

          {/* Coach mention */}
          <View style={styles.coachRow}>
            <View>
              <Text style={styles.coachName}>Louis Phillips · <Text style={styles.coachRole}>INTVL Co-Founder</Text></Text>
              <Text style={styles.coachDesc} numberOfLines={2}>
                I'm Louis, co-founder of INTVL. I'm an avid runner, gym enthusiast, and ...{' '}
                <Text style={styles.seeMore}>see more</Text>
              </Text>
            </View>
          </View>

          {WEEK_PLAN.map((day, i) => (
            <DayRow key={i} day={day} />
          ))}
        </View>
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
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  scrollContent: { paddingHorizontal: 16 },
  nextRunSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  nextRunLeft: { gap: 4 },
  nextRunLabel: { fontSize: 13, fontWeight: '700', color: COLORS.foreground },
  nextRunMeta: { fontSize: 12, color: COLORS.foregroundMuted },
  nextRunRight: { alignItems: 'flex-end' },
  nextRunDate: { fontSize: 28, fontWeight: '800', color: COLORS.foreground },
  nextRunDistance: { fontSize: 28, fontWeight: '800', color: COLORS.foreground },
  startBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: COLORS.radiusSm,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radiusSm,
    padding: 12,
    marginBottom: 16,
    gap: 12,
  },
  completedDay: { color: COLORS.foreground, fontWeight: '700', fontSize: 14, minWidth: 36 },
  completedStat: { flex: 1, color: COLORS.foreground, fontWeight: '600', fontSize: 13, textAlign: 'center' },
  weekCard: {
    backgroundColor: COLORS.foreground,
    borderRadius: COLORS.radius,
    padding: 16,
    gap: 0,
  },
  weekCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekCardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.background },
  reorderBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reorderText: { fontSize: 12, color: '#666' },
  coachRow: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' },
  coachName: { fontSize: 13, fontWeight: '700', color: '#222' },
  coachRole: { fontWeight: '400', color: '#666' },
  coachDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  seeMore: { color: '#333', fontWeight: '600' },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 10,
  },
  dayRowHighlight: {},
  dayLeft: { width: 50 },
  dayName: { fontSize: 13, fontWeight: '700', color: '#888' },
  dayDate: { fontSize: 10, color: '#BBB' },
  dayCenter: { flex: 1 },
  dayStatus: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5, marginBottom: 2 },
  dayDistance: { fontSize: 16, fontWeight: '800', color: '#888' },
  dayRunType: { fontSize: 11, color: '#AAA' },
  restText: { fontSize: 13, color: '#CCC' },
  dayAction: {
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
