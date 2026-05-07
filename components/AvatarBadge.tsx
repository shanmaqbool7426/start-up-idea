import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

type Props = {
  letter: string;
  level: number;
  size?: number;
  showRing?: boolean;
  xpPercent?: number;
};

export default function AvatarBadge({ letter, level, size = 64, showRing = true, xpPercent = 0.82 }: Props) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showRing) return;
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 8000, useNativeDriver: true })
    ).start();
  }, [spin, showRing]);

  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference * (1 - xpPercent);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {showRing && (
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={COLORS.border}
            strokeWidth={3}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={COLORS.primary}
            strokeWidth={3}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />
        </Svg>
      )}
      <View style={[styles.avatar, { width: size - 10, height: size - 10, borderRadius: (size - 10) / 2 }]}>
        <Text style={[styles.letter, { fontSize: size * 0.35 }]}>{letter}</Text>
      </View>
      <View style={[styles.levelBadge, { bottom: -2, right: -4 }]}>
        <Text style={styles.levelText}>{level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  letter: {
    color: COLORS.foreground,
    fontWeight: '700',
  },
  levelBadge: {
    position: 'absolute',
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  levelText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '800',
  },
});
