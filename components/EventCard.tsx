import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { GameEvent } from '@/constants/data';
import * as Haptics from 'expo-haptics';

type Props = { event: GameEvent };

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  flame: 'flame',
  flash: 'flash',
  skull: 'skull',
  gift: 'gift',
};

export default function EventCard({ event }: Props) {
  const handleJoin = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  return (
    <LinearGradient
      colors={[event.color + '33', COLORS.card]}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: event.color + '33' }]}>
          <Ionicons name={ICON_MAP[event.icon] ?? 'flash'} size={24} color={event.color} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.desc}>{event.description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={12} color={COLORS.foregroundMuted} />
          <Text style={styles.statText}>{event.timeLeft}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="people-outline" size={12} color={COLORS.foregroundMuted} />
          <Text style={styles.statText}>{event.participants.toLocaleString()}</Text>
        </View>
        {event.xpMultiplier && (
          <View style={[styles.multiplier, { backgroundColor: event.color + '33' }]}>
            <Text style={[styles.multiplierText, { color: event.color }]}>{event.xpMultiplier}x XP</Text>
          </View>
        )}
        <TouchableOpacity style={[styles.joinBtn, { backgroundColor: event.color }]} onPress={handleJoin} activeOpacity={0.8}>
          <Text style={styles.joinText}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: COLORS.radiusLg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    gap: 14,
  },
  header: { flexDirection: 'row', gap: 14 },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, justifyContent: 'center', gap: 4 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.foreground },
  desc: { fontSize: 12, color: COLORS.foregroundMuted },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 11, color: COLORS.foregroundMuted },
  multiplier: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  multiplierText: { fontSize: 11, fontWeight: '700' },
  joinBtn: {
    marginLeft: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  joinText: { fontSize: 12, fontWeight: '800', color: '#fff' },
});
