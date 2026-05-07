import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { Quest } from '@/constants/data';

type Props = { quest: Quest; onClaim?: () => void };

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  flag: 'flag',
  footsteps: 'footsteps',
  heart: 'heart',
  shield: 'shield',
  compass: 'compass',
  flash: 'flash',
  trophy: 'trophy',
  star: 'star',
};

const TYPE_COLORS: Record<string, string> = {
  daily: COLORS.accent,
  weekly: COLORS.primary,
  special: COLORS.gold,
};

export default function QuestCard({ quest, onClaim }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const pct = Math.min(quest.progress / quest.maxProgress, 1);
  const typeColor = TYPE_COLORS[quest.type] || COLORS.primary;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: pct,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [pct, progress]);

  const barWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={[styles.card, quest.completed && styles.completed]}>
      <View style={[styles.iconWrap, { backgroundColor: typeColor + '22' }]}>
        <Ionicons name={ICON_MAP[quest.icon] ?? 'star'} size={22} color={quest.completed ? COLORS.foregroundDim : typeColor} />
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.title, quest.completed && styles.dimText]}>{quest.title}</Text>
          <View style={[styles.typeBadge, { backgroundColor: typeColor + '22' }]}>
            <Text style={[styles.typeText, { color: typeColor }]}>{quest.type.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.desc}>{quest.description}</Text>
        <View style={styles.progressRow}>
          <View style={styles.track}>
            <Animated.View style={[styles.fill, { width: barWidth, backgroundColor: quest.completed ? COLORS.green : typeColor }]} />
          </View>
          <Text style={styles.progressText}>
            {quest.progress.toLocaleString()}/{quest.maxProgress.toLocaleString()}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.xpBadge}>
            <Ionicons name="flash" size={10} color={COLORS.gold} />
            <Text style={styles.xpText}>+{quest.xpReward} XP</Text>
          </View>
          {quest.timeLeft && !quest.completed && (
            <Text style={styles.timeLeft}>{quest.timeLeft}</Text>
          )}
          {quest.completed && (
            <TouchableOpacity style={styles.claimBtn} onPress={onClaim}>
              <Text style={styles.claimText}>CLAIM</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    gap: 12,
  },
  completed: { borderColor: COLORS.green + '44', opacity: 0.8 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: 6 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flex: 1, fontSize: 15, fontWeight: '700', color: COLORS.foreground },
  dimText: { color: COLORS.foregroundDim },
  typeBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10 },
  typeText: { fontSize: 9, fontWeight: '700' },
  desc: { fontSize: 12, color: COLORS.foregroundMuted },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  track: { flex: 1, height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 10, color: COLORS.foregroundMuted, minWidth: 60, textAlign: 'right' },
  bottomRow: { flexDirection: 'row', alignItems: 'center' },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  xpText: { fontSize: 11, color: COLORS.gold, fontWeight: '600' },
  timeLeft: { marginLeft: 'auto', fontSize: 11, color: COLORS.foregroundDim },
  claimBtn: {
    marginLeft: 'auto',
    backgroundColor: COLORS.green,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  claimText: { fontSize: 11, color: '#fff', fontWeight: '700' },
});
