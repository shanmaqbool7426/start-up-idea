import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Rect, Path, Circle, Text as SvgText, Defs, LinearGradient, Stop, RadialGradient
} from 'react-native-svg';
import { COLORS } from '@/constants/colors';

// Fixed design canvas — SVG will scale to fill via preserveAspectRatio
const W = 400;
const H = 600;

const TERRITORIES = [
  {
    id: 't1', label: 'NORTHGATE',
    color: COLORS.territory.user, opacity: 0.58,
    path: `M ${W*0.2},0 L ${W*0.65},0 L ${W*0.62},${H*0.25} L ${W*0.45},${H*0.28} L ${W*0.22},${H*0.22} Z`,
    lx: W*0.38, ly: H*0.13,
  },
  {
    id: 't2', label: 'WESTSIDE',
    color: COLORS.territory.team2, opacity: 0.58,
    path: `M ${W*0.05},${H*0.15} L ${W*0.22},${H*0.22} L ${W*0.18},${H*0.45} L ${W*0.02},${H*0.5} Z`,
    lx: W*0.1, ly: H*0.32,
  },
  {
    id: 't3', label: 'MIDTOWN',
    color: COLORS.territory.team3, opacity: 0.58,
    path: `M ${W*0.22},${H*0.22} L ${W*0.45},${H*0.28} L ${W*0.5},${H*0.45} L ${W*0.3},${H*0.52} L ${W*0.18},${H*0.45} Z`,
    lx: W*0.32, ly: H*0.37,
  },
  {
    id: 't4', label: 'EASTPORT',
    color: COLORS.territory.team4, opacity: 0.58,
    path: `M ${W*0.62},${H*0.25} L ${W},${H*0.18} L ${W},${H*0.5} L ${W*0.72},${H*0.55} L ${W*0.55},${H*0.48} Z`,
    lx: W*0.78, ly: H*0.37,
  },
  {
    id: 't5', label: 'HARBOR',
    color: COLORS.territory.team5, opacity: 0.55,
    path: `M ${W*0.02},${H*0.5} L ${W*0.18},${H*0.45} L ${W*0.3},${H*0.52} L ${W*0.25},${H*0.72} L ${W*0.05},${H*0.7} Z`,
    lx: W*0.13, ly: H*0.58,
  },
  {
    id: 't6', label: 'SOUTHPARK',
    color: COLORS.territory.team6, opacity: 0.55,
    path: `M ${W*0.3},${H*0.52} L ${W*0.5},${H*0.45} L ${W*0.62},${H*0.58} L ${W*0.55},${H*0.78} L ${W*0.3},${H*0.72} Z`,
    lx: W*0.45, ly: H*0.63,
  },
  {
    id: 't7', label: 'DOCKLANDS',
    color: COLORS.territory.team7, opacity: 0.52,
    path: `M ${W*0.55},${H*0.78} L ${W*0.72},${H*0.55} L ${W},${H*0.5} L ${W},${H*0.85} L ${W*0.65},${H*0.88} Z`,
    lx: W*0.8, ly: H*0.68,
  },
  {
    id: 't8', label: 'BAYVIEW',
    color: COLORS.territory.user, opacity: 0.48,
    path: `M ${W*0.05},${H*0.7} L ${W*0.25},${H*0.72} L ${W*0.3},${H*0.72} L ${W*0.35},${H*0.88} L ${W*0.1},${H*0.9} L ${W*0.02},${H*0.82} Z`,
    lx: W*0.17, ly: H*0.8,
  },
  {
    id: 't9', label: 'RIVERSIDE',
    color: COLORS.territory.team3, opacity: 0.45,
    path: `M ${W*0.35},${H*0.88} L ${W*0.55},${H*0.78} L ${W*0.65},${H*0.88} L ${W*0.6},${H} L ${W*0.3},${H} Z`,
    lx: W*0.47, ly: H*0.93,
  },
];

const MAJOR_ROADS = [
  `M 0,${H*0.3} L ${W},${H*0.32}`,
  `M 0,${H*0.55} L ${W},${H*0.57}`,
  `M ${W*0.35},0 L ${W*0.33},${H}`,
  `M ${W*0.65},0 L ${W*0.67},${H}`,
  `M 0,${H*0.72} L ${W},${H*0.74}`,
  `M ${W*0.15},0 L ${W*0.13},${H*0.6}`,
];

const MINOR_ROADS: string[] = [];
for (let y = 0; y <= H; y += H * 0.08) {
  MINOR_ROADS.push(`M 0,${y} L ${W},${y}`);
}
for (let x = 0; x <= W; x += W * 0.12) {
  MINOR_ROADS.push(`M ${x},0 L ${x},${H}`);
}

export default function CityMap() {
  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <Defs>
          <LinearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#0A1028" />
            <Stop offset="100%" stopColor="#0F1520" />
          </LinearGradient>
          <RadialGradient id="playerGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.7" />
            <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Base */}
        <Rect width={W} height={H} fill="url(#mapGrad)" />

        {/* Water */}
        <Path d={`M 0,0 L ${W*0.18},0 L ${W*0.05},${H*0.15} L 0,${H*0.15} Z`} fill="#08101E" opacity={0.9} />
        <Path d={`M 0,${H*0.8} L ${W*0.04},${H*0.75} L 0,${H*0.7} Z`} fill="#08101E" opacity={0.5} />

        {/* Minor grid */}
        {MINOR_ROADS.map((d, i) => (
          <Path key={`mr${i}`} d={d} stroke="#1A2238" strokeWidth={0.5} fill="none" opacity={0.5} />
        ))}

        {/* Territories */}
        {TERRITORIES.map(t => (
          <Path key={t.id} d={t.path} fill={t.color} opacity={t.opacity} stroke={t.color} strokeWidth={1.5} strokeOpacity={0.9} />
        ))}

        {/* Major roads */}
        {MAJOR_ROADS.map((d, i) => (
          <Path key={`rd${i}`} d={d} stroke="#252F45" strokeWidth={2.5} fill="none" opacity={0.85} />
        ))}

        {/* Territory labels */}
        {TERRITORIES.map(t => (
          <SvgText key={`lbl${t.id}`} x={t.lx} y={t.ly} fontSize={10} fill="#FFFFFF" opacity={0.65} textAnchor="middle" fontWeight="700">
            {t.label}
          </SvgText>
        ))}

        {/* Player glow */}
        <Circle cx={W*0.45} cy={H*0.28} r={18} fill="url(#playerGlow)" />
        <Circle cx={W*0.45} cy={H*0.28} r={7} fill={COLORS.primary} />
        <Circle cx={W*0.45} cy={H*0.28} r={4} fill="white" />

        {/* Dotted trail */}
        <Path
          d={`M ${W*0.45},${H*0.28} L ${W*0.38},${H*0.22} L ${W*0.3},${H*0.18}`}
          stroke="white" strokeWidth={1.5} strokeDasharray="4,4" fill="none" opacity={0.5}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
