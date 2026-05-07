import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { Achievement } from '@/constants/data';

type Props = { achievement: Achievement; size?: number };

const RARITY_COLORS: Record<string, string> = {
  common: '#64748B',
  rare: COLORS.accent,
  epic: COLORS.primary,
  legendary: COLORS.gold,
};

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  flame: 'flame',
  flag: 'flag',
  flash: 'flash',
  trophy: 'trophy',
  star: 'star',
  stopwatch: 'stopwatch',
  people: 'people',
  moon: 'moon',
};

export default function AchievementBadge({ achievement, size = 56 }: Props) {
  const color = RARITY_COLORS[achievement.rarity];

  return (
    <TouchableOpacity style={[styles.badge, { width: size, height: size, borderRadius: size * 0.25, borderColor: color }]} activeOpacity={0.8}>
      <View style={[styles.inner, { backgroundColor: color + '22', opacity: achievement.unlocked ? 1 : 0.4 }]}>
        <Ionicons
          name={ICON_MAP[achievement.icon] ?? 'star'}
          size={size * 0.42}
          color={achievement.unlocked ? color : COLORS.foregroundDim}
        />
      </View>
      {!achievement.unlocked && (
        <View style={styles.lock}>
          <Ionicons name="lock-closed" size={10} color={COLORS.foregroundDim} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1.5,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  lock: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 2,
  },
});
