import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Rect, Path, Circle, Defs, LinearGradient, Stop, Polygon
} from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';

const safeHaptic = (style: Haptics.ImpactFeedbackStyle) => {
  if (Platform.OS !== 'web') Haptics.impactAsync(style);
};

// Fixed design canvas for the run map
const VW = 400;
const VH = 300;

function RunMap() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="runMapGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E8DCC8" />
          <Stop offset="100%" stopColor="#D4C9A8" />
        </LinearGradient>
      </Defs>

      {/* Base map - light style */}
      <Rect width={VW} height={VH} fill="url(#runMapGrad)" />

      {/* City blocks */}
      <Rect x={VW*0.05} y={VH*0.05} width={VW*0.4} height={VH*0.3} fill="#D8CCAA" rx={2} />
      <Rect x={VW*0.5}  y={VH*0.05} width={VW*0.45} height={VH*0.3} fill="#D0C49E" rx={2} />
      <Rect x={VW*0.05} y={VH*0.42} width={VW*0.35} height={VH*0.35} fill="#B8D4A0" rx={2} />
      <Rect x={VW*0.45} y={VH*0.42} width={VW*0.5} height={VH*0.35} fill="#D4C9A0" rx={2} />

      {/* Roads */}
      <Rect x={0}       y={VH*0.37} width={VW} height={5} fill="#F5F0E0" />
      <Rect x={0}       y={VH*0.78} width={VW} height={4} fill="#F5F0E0" />
      <Rect x={VW*0.43} y={0}       width={4}  height={VH} fill="#F5F0E0" />
      <Rect x={VW*0.05} y={0}       width={3}  height={VH} fill="#F5F0E0" />

      {/* Captured territory overlay */}
      <Polygon
        points={`${VW*0.45},${VH*0.08} ${VW*0.85},${VH*0.08} ${VW*0.85},${VH*0.37} ${VW*0.43},${VH*0.37}`}
        fill={COLORS.primary}
        opacity={0.28}
        stroke={COLORS.primary}
        strokeWidth={2}
        strokeDasharray="6,4"
      />

      {/* Route line */}
      <Path
        d={`M ${VW*0.45},${VH*0.08} L ${VW*0.85},${VH*0.08} L ${VW*0.85},${VH*0.37} L ${VW*0.7},${VH*0.55}`}
        stroke={COLORS.blue}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Start point */}
      <Circle cx={VW*0.45} cy={VH*0.08} r={6} fill={COLORS.primary} />
      <Circle cx={VW*0.45} cy={VH*0.08} r={3} fill="white" />

      {/* Current location */}
      <Circle cx={VW*0.7} cy={VH*0.55} r={10} fill={COLORS.blue} opacity={0.25} />
      <Circle cx={VW*0.7} cy={VH*0.55} r={6}  fill={COLORS.blue} />
      <Circle cx={VW*0.7} cy={VH*0.55} r={3}  fill="white" />
    </Svg>
  );
}

export default function RunScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 52 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 0 : insets.bottom;
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [territory, setTerritory] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const pace = elapsed > 0 && distance > 0 ? (elapsed / 60 / distance) : 0;
  const paceMin = Math.floor(pace);
  const paceSec = Math.round((pace - paceMin) * 60);
  const paceStr = pace > 0 ? `${paceMin}:${String(paceSec).padStart(2, '0')}` : '--:--';

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setElapsed(e => e + 1);
        setDistance(d => parseFloat((d + 0.003).toFixed(3)));
        setTerritory(t => parseFloat((t + 0.0003).toFixed(4)));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);

  const handleToggle = () => {
    safeHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    setRunning(r => !r);
  };

  return (
    <View style={styles.root}>
      {/* Light map fills the top portion */}
      <View style={[styles.mapContainer, { paddingTop: topPad }]}>
        <RunMap />
      </View>

      {/* Stats panel — white/light at bottom */}
      <View style={[styles.statsPanel, { paddingBottom: bottomPad + 90 }]}>
        {/* GPS indicator */}
        <View style={styles.gpsRow}>
          <Ionicons name="wifi" size={12} color={running ? COLORS.green : '#AAA'} />
          <Text style={[styles.gpsText, { color: running ? COLORS.green : '#AAA' }]}>
            GPS {running ? 'Active' : 'Ready'}
          </Text>
        </View>

        {/* Territory captured */}
        <Text style={styles.territoryVal}>{territory.toFixed(3)}km²</Text>
        <Text style={styles.territoryLabel}>Capture in Progress</Text>

        {/* Run stats */}
        <View style={styles.runStats}>
          <View style={styles.runStat}>
            <Text style={styles.runStatVal}>{distance.toFixed(2)}km</Text>
            <Text style={styles.runStatLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.runStat}>
            <Text style={styles.runStatVal}>{formatTime(elapsed)}</Text>
            <Text style={styles.runStatLabel}>Duration</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.runStat}>
            <Text style={styles.runStatVal}>{paceStr}</Text>
            <Text style={styles.runStatLabel}>Avg Pace</Text>
          </View>
        </View>

        {/* Pause / Start button */}
        <TouchableOpacity
          style={[
            styles.pauseBtn,
            { backgroundColor: running ? '#111' : COLORS.primary, borderColor: running ? '#333' : COLORS.primary }
          ]}
          onPress={handleToggle}
          activeOpacity={0.88}
        >
          <Ionicons
            name={running ? 'pause' : 'walk'}
            size={18}
            color="#fff"
          />
          <Text style={styles.pauseBtnText}>
            {running ? 'Pause Run' : 'Start Run'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F0EAD6' },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  statsPanel: {
    backgroundColor: '#FAFAF8',
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  gpsRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 2 },
  gpsText: { fontSize: 11, fontWeight: '600' },
  territoryVal: {
    fontSize: 48,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -1,
    lineHeight: 54,
  },
  territoryLabel: { fontSize: 12, color: '#888', marginBottom: 14 },
  runStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  runStat: { flex: 1, alignItems: 'center' },
  runStatVal: { fontSize: 20, fontWeight: '800', color: '#111' },
  runStatLabel: { fontSize: 11, color: '#888' },
  statDivider: { width: 1, height: 36, backgroundColor: '#E5E5E5' },
  pauseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 8,
    paddingVertical: 16,
    width: '100%',
    borderWidth: 1,
  },
  pauseBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
