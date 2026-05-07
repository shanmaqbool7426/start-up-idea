import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  xp: number;
  maxXp: number;
  level: number;
  compact?: boolean;
};

export default function XPBar({ xp, maxXp, level, compact = false }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const pct = Math.min(xp / maxXp, 1);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: pct,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [pct, progress]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactBar}>
          <Animated.View style={[styles.compactFill, { width: barWidth }]} />
        </View>
        <Text style={styles.compactText}>{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv.{level}</Text>
        </View>
        <Text style={styles.xpText}>{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</Text>
        <Text style={styles.pctText}>{Math.round(pct * 100)}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: barWidth }]}>
          <View style={styles.fillGlow} />
        </Animated.View>
        {[0.25, 0.5, 0.75].map(mark => (
          <View key={mark} style={[styles.tick, { left: `${mark * 100}%` as any }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  levelBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginRight: 10,
  },
  levelText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  xpText: { flex: 1, color: COLORS.foregroundMuted, fontSize: 12 },
  pctText: { color: COLORS.gold, fontSize: 12, fontWeight: '600' },
  track: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillGlow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.8,
  },
  tick: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.background,
    opacity: 0.5,
  },
  compactContainer: { gap: 4 },
  compactBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  compactFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  compactText: { color: COLORS.foregroundDim, fontSize: 10 },
});
