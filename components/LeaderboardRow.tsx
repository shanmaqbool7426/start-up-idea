import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  rank: number;
  name: string;
  clan: string;
  xp: number;
  level: number;
  change: number;
  isUser?: boolean;
};

export default function LeaderboardRow({ rank, name, clan, xp, level, change, isUser }: Props) {
  const rankColor = rank === 1 ? COLORS.gold : rank === 2 ? '#94A3B8' : rank === 3 ? '#B45309' : COLORS.foregroundMuted;
  const changeIcon = change > 0 ? 'arrow-up' : change < 0 ? 'arrow-down' : 'remove';
  const changeColor = change > 0 ? COLORS.green : change < 0 ? COLORS.red : COLORS.foregroundDim;

  return (
    <View style={[styles.row, isUser && styles.userRow]}>
      <Text style={[styles.rank, { color: rankColor }]}>
        {rank <= 3 ? ['🥇','🥈','🥉'][rank - 1] : `#${rank}`}
      </Text>
      <View style={[styles.avatar, { backgroundColor: isUser ? COLORS.primaryDim : COLORS.cardAlt }]}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, isUser && styles.userName]}>{name}</Text>
        <Text style={styles.clan}>[{clan}] · Lv.{level}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.xp}>{(xp / 1000).toFixed(1)}K</Text>
        <View style={styles.change}>
          <Ionicons name={changeIcon as any} size={10} color={changeColor} />
          {change !== 0 && <Text style={[styles.changeText, { color: changeColor }]}>{Math.abs(change)}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radiusSm,
    padding: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  userRow: {
    borderColor: COLORS.primary + '66',
    backgroundColor: COLORS.primaryDim + '33',
  },
  rank: { width: 28, fontSize: 14, fontWeight: '700', textAlign: 'center' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '700', color: COLORS.foreground },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: COLORS.foreground },
  userName: { color: COLORS.primaryLight },
  clan: { fontSize: 11, color: COLORS.foregroundMuted },
  right: { alignItems: 'flex-end', gap: 2 },
  xp: { fontSize: 14, fontWeight: '700', color: COLORS.gold },
  change: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  changeText: { fontSize: 10, fontWeight: '600' },
});
