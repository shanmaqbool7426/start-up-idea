export const COLORS = {
  background: '#0D0D0D',
  backgroundAlt: '#111111',
  card: '#1A1A1A',
  cardAlt: '#222222',
  cardBright: '#2A2A2A',
  primary: '#FF6B6B',
  primaryLight: '#FF8E8E',
  primaryDark: '#CC4444',
  accent: '#FF6B6B',
  accentLight: '#FF9999',
  gold: '#F5C842',
  goldLight: '#FFE066',
  green: '#4CAF50',
  greenLight: '#66BB6A',
  blue: '#4B9FFF',
  teal: '#26C6DA',
  purple: '#AB47BC',
  orange: '#FF7043',
  pink: '#F06292',
  foreground: '#FFFFFF',
  foregroundMuted: '#888888',
  foregroundDim: '#444444',
  border: '#2A2A2A',
  borderLight: '#333333',
  radius: 12,
  radiusLg: 20,
  radiusSm: 6,

  // Territory map colors (matching INTVL style)
  territory: {
    user: '#4B9FFF',      // blue - user
    team2: '#26C6DA',     // teal
    team3: '#FF7043',     // orange
    team4: '#AB47BC',     // purple
    team5: '#4CAF50',     // green
    team6: '#F06292',     // pink
    team7: '#FFD740',     // yellow
    unclaimed: '#1E2433', // dark unclaimed
  },

  // Map colors
  mapBg: '#0F1520',
  mapWater: '#0A1028',
  mapLand: '#141C2E',
  mapRoad: '#1E2840',
  mapRoadMajor: '#252F45',
  mapLabel: '#4A5568',
} as const;

export type Colors = typeof COLORS;
