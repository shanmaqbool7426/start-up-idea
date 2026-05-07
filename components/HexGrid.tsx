import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import Svg, { Polygon, Circle, G, Defs, RadialGradient, Stop, Text as SvgText } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEX_SIZE = Platform.OS === 'web' ? 22 : 20;
const SQRT3 = Math.sqrt(3);

type HexCell = {
  q: number;
  r: number;
  team: 'user' | 'blue' | 'cyan' | 'orange' | 'red' | 'green' | 'unclaimed';
  isPlayer?: boolean;
};

function getHexCorners(cx: number, cy: number, size: number): string {
  const corners: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 30;
    const angleRad = (Math.PI / 180) * angleDeg;
    corners.push(`${cx + size * Math.cos(angleRad)},${cy + size * Math.sin(angleRad)}`);
  }
  return corners.join(' ');
}

function getHexCenter(q: number, r: number, size: number, offsetX: number, offsetY: number) {
  const x = size * SQRT3 * (q + 0.5 * (r & 1)) + offsetX;
  const y = size * 1.5 * r + offsetY;
  return { x, y };
}

const TEAM_COLORS: Record<string, string> = {
  user: COLORS.primary,
  blue: '#3B82F6',
  cyan: COLORS.accent,
  orange: COLORS.orange,
  red: COLORS.red,
  green: COLORS.green,
  unclaimed: '#1E1E2E',
};

const TEAM_COLORS_DIM: Record<string, string> = {
  user: '#2D1B6B',
  blue: '#1E3A8A',
  cyan: '#0E4D5C',
  orange: '#7C2D12',
  red: '#7F1D1D',
  green: '#064E3B',
  unclaimed: '#12121C',
};

const HEX_GRID: HexCell[] = [
  { q: 0, r: 0, team: 'unclaimed' }, { q: 1, r: 0, team: 'user' }, { q: 2, r: 0, team: 'user' },
  { q: 3, r: 0, team: 'user' }, { q: 4, r: 0, team: 'cyan' }, { q: 5, r: 0, team: 'cyan' },
  { q: 6, r: 0, team: 'unclaimed' }, { q: 7, r: 0, team: 'unclaimed' },
  { q: 0, r: 1, team: 'user' }, { q: 1, r: 1, team: 'user', isPlayer: true }, { q: 2, r: 1, team: 'user' },
  { q: 3, r: 1, team: 'user' }, { q: 4, r: 1, team: 'cyan' }, { q: 5, r: 1, team: 'cyan' },
  { q: 6, r: 1, team: 'blue' }, { q: 7, r: 1, team: 'blue' },
  { q: 0, r: 2, team: 'user' }, { q: 1, r: 2, team: 'user' }, { q: 2, r: 2, team: 'user' },
  { q: 3, r: 2, team: 'unclaimed' }, { q: 4, r: 2, team: 'unclaimed' }, { q: 5, r: 2, team: 'blue' },
  { q: 6, r: 2, team: 'blue' }, { q: 7, r: 2, team: 'blue' },
  { q: 0, r: 3, team: 'orange' }, { q: 1, r: 3, team: 'orange' }, { q: 2, r: 3, team: 'unclaimed' },
  { q: 3, r: 3, team: 'unclaimed' }, { q: 4, r: 3, team: 'unclaimed' }, { q: 5, r: 3, team: 'blue' },
  { q: 6, r: 3, team: 'blue' }, { q: 7, r: 3, team: 'unclaimed' },
  { q: 0, r: 4, team: 'orange' }, { q: 1, r: 4, team: 'orange' }, { q: 2, r: 4, team: 'orange' },
  { q: 3, r: 4, team: 'red' }, { q: 4, r: 4, team: 'red' }, { q: 5, r: 4, team: 'red' },
  { q: 6, r: 4, team: 'unclaimed' }, { q: 7, r: 4, team: 'green' },
  { q: 0, r: 5, team: 'orange' }, { q: 1, r: 5, team: 'unclaimed' }, { q: 2, r: 5, team: 'red' },
  { q: 3, r: 5, team: 'red' }, { q: 4, r: 5, team: 'red' }, { q: 5, r: 5, team: 'red' },
  { q: 6, r: 5, team: 'green' }, { q: 7, r: 5, team: 'green' },
  { q: 0, r: 6, team: 'unclaimed' }, { q: 1, r: 6, team: 'unclaimed' }, { q: 2, r: 6, team: 'red' },
  { q: 3, r: 6, team: 'red' }, { q: 4, r: 6, team: 'unclaimed' }, { q: 5, r: 6, team: 'green' },
  { q: 6, r: 6, team: 'green' }, { q: 7, r: 6, team: 'green' },
  { q: 0, r: 7, team: 'unclaimed' }, { q: 1, r: 7, team: 'unclaimed' }, { q: 2, r: 7, team: 'unclaimed' },
  { q: 3, r: 7, team: 'unclaimed' }, { q: 4, r: 7, team: 'green' }, { q: 5, r: 7, team: 'green' },
  { q: 6, r: 7, team: 'green' }, { q: 7, r: 7, team: 'unclaimed' },
];

const COLS = 8;
const ROWS = 8;
const GRID_W = HEX_SIZE * SQRT3 * (COLS + 0.5) + 8;
const GRID_H = HEX_SIZE * 1.5 * ROWS + HEX_SIZE + 8;
const OFFSET_X = HEX_SIZE * SQRT3 * 0.5 + 4;
const OFFSET_Y = HEX_SIZE + 4;

function HexCell({ cell, size, pulse }: { cell: HexCell; size: number; pulse: Animated.Value }) {
  const { x, y } = getHexCenter(cell.q, cell.r, size, OFFSET_X, OFFSET_Y);
  const points = getHexCorners(x, y, size - 1.5);
  const color = TEAM_COLORS[cell.team];
  const dimColor = TEAM_COLORS_DIM[cell.team];
  const isUnclaimed = cell.team === 'unclaimed';

  return (
    <G>
      <Polygon
        points={points}
        fill={dimColor}
        stroke={isUnclaimed ? '#1A1A2E' : color}
        strokeWidth={isUnclaimed ? 0.5 : 1.2}
        opacity={isUnclaimed ? 0.6 : 1}
      />
      {cell.isPlayer && (
        <>
          <Circle cx={x} cy={y} r={size * 0.45} fill={color} opacity={0.3} />
          <Circle cx={x} cy={y} r={size * 0.22} fill={COLORS.foreground} />
        </>
      )}
    </G>
  );
}

export default function HexGrid() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: false }),
      ])
    ).start();
  }, [pulse]);

  const gridWidth = Math.min(SCREEN_WIDTH - 16, 400);
  const scale = gridWidth / GRID_W;

  return (
    <View style={styles.container}>
      <Svg
        width={gridWidth}
        height={GRID_H * scale}
        viewBox={`0 0 ${GRID_W} ${GRID_H}`}
      >
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.4" />
            <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        {HEX_GRID.map((cell) => (
          <HexCell
            key={`${cell.q}-${cell.r}`}
            cell={cell}
            size={HEX_SIZE}
            pulse={pulse}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
