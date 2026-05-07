export type Territory = {
  id: string;
  name: string;
  team: 'user' | 'blue' | 'cyan' | 'orange' | 'red' | 'green' | 'unclaimed';
  hexCount: number;
  xp: number;
};

export type Clan = {
  id: string;
  name: string;
  tag: string;
  rank: number;
  members: number;
  xp: number;
  territories: number;
  level: number;
  color: string;
  isUserClan?: boolean;
};

export type User = {
  id: string;
  name: string;
  username: string;
  level: number;
  xp: number;
  maxXp: number;
  rank: string;
  streak: number;
  territories: number;
  badges: string[];
  clan: string;
  avatar: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  progress: number;
  maxProgress: number;
  type: 'daily' | 'weekly' | 'special';
  timeLeft?: string;
  completed: boolean;
};

export type GameEvent = {
  id: string;
  title: string;
  description: string;
  type: 'war' | 'hunt' | 'zombie' | 'double-xp' | 'seasonal';
  xpMultiplier?: number;
  timeLeft: string;
  participants: number;
  icon: string;
  color: string;
};

export type Post = {
  id: string;
  userId: string;
  username: string;
  clan: string;
  timeAgo: string;
  content: string;
  territory?: string;
  likes: number;
  comments: number;
  type: 'conquest' | 'achievement' | 'event' | 'status';
  liked: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
};

export type Story = {
  id: string;
  username: string;
  isActive: boolean;
  isUser?: boolean;
};

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Cipher',
  username: '@alexcipher',
  level: 34,
  xp: 7420,
  maxXp: 9000,
  rank: 'Gold',
  streak: 12,
  territories: 47,
  badges: ['🔥', '⚡', '🏆'],
  clan: 'Neon Wolves',
  avatar: 'A',
};

export const TERRITORIES: Territory[] = [
  { id: 't1', name: 'Neon District', team: 'user', hexCount: 47, xp: 3200 },
  { id: 't2', name: 'Tech Hub', team: 'cyan', hexCount: 38, xp: 2800 },
  { id: 't3', name: 'Gold Rush Quarter', team: 'orange', hexCount: 55, xp: 4100 },
  { id: 't4', name: 'Midnight Zone', team: 'blue', hexCount: 29, xp: 1900 },
  { id: 't5', name: 'Shadow Quarter', team: 'red', hexCount: 43, xp: 3500 },
  { id: 't6', name: 'Crystal Plains', team: 'green', hexCount: 31, xp: 2200 },
];

export const TOP_CLANS: Clan[] = [
  { id: 'c1', name: 'Neon Wolves', tag: 'NW', rank: 1, members: 48, xp: 284000, territories: 142, level: 32, color: '#7C3AED', isUserClan: true },
  { id: 'c2', name: 'Cyber Sharks', tag: 'CS', rank: 2, members: 50, xp: 261000, territories: 128, level: 30, color: '#06B6D4' },
  { id: 'c3', name: 'Iron Phoenix', tag: 'IP', rank: 3, members: 45, xp: 248000, territories: 115, level: 28, color: '#F97316' },
  { id: 'c4', name: 'Storm Riders', tag: 'SR', rank: 4, members: 42, xp: 221000, territories: 98, level: 25, color: '#3B82F6' },
  { id: 'c5', name: 'Blood Ravens', tag: 'BR', rank: 5, members: 38, xp: 198000, territories: 87, level: 23, color: '#EF4444' },
  { id: 'c6', name: 'Green Serpents', tag: 'GS', rank: 6, members: 35, xp: 174000, territories: 76, level: 21, color: '#10B981' },
];

export const DAILY_QUESTS: Quest[] = [
  { id: 'q1', title: 'Territory March', description: 'Capture 5 new territories today', icon: 'flag', xpReward: 500, progress: 3, maxProgress: 5, type: 'daily', timeLeft: '6h left', completed: false },
  { id: 'q2', title: 'Step Master', description: 'Walk 8,000 steps', icon: 'footsteps', xpReward: 300, progress: 6200, maxProgress: 8000, type: 'daily', timeLeft: '6h left', completed: false },
  { id: 'q3', title: 'Social Butterfly', description: 'React to 10 posts', icon: 'heart', xpReward: 150, progress: 10, maxProgress: 10, type: 'daily', completed: true },
  { id: 'q4', title: 'Clan Warrior', description: 'Win 3 territory battles', icon: 'shield', xpReward: 750, progress: 1, maxProgress: 3, type: 'daily', timeLeft: '6h left', completed: false },
  { id: 'q5', title: 'Night Explorer', description: 'Visit 3 different zones', icon: 'compass', xpReward: 400, progress: 2, maxProgress: 3, type: 'weekly', timeLeft: '2d left', completed: false },
  { id: 'q6', title: 'XP Rush', description: 'Earn 2,000 XP in a single day', icon: 'flash', xpReward: 600, progress: 1440, maxProgress: 2000, type: 'weekly', timeLeft: '2d left', completed: false },
];

export const EVENTS: GameEvent[] = [
  { id: 'e1', title: 'City War Season 3', description: 'All-out clan battle for city supremacy', type: 'war', timeLeft: '2d 14h', participants: 1284, icon: 'flame', color: '#EF4444' },
  { id: 'e2', title: 'Double XP Weekend', description: 'All actions earn 2x XP', type: 'double-xp', xpMultiplier: 2, timeLeft: '1d 8h', participants: 3841, icon: 'flash', color: '#F59E0B' },
  { id: 'e3', title: 'Zombie Mode', description: 'Defend your territories from zombie hordes', type: 'zombie', timeLeft: '18h', participants: 892, icon: 'skull', color: '#10B981' },
  { id: 'e4', title: 'Treasure Hunt', description: 'Hidden crates across the city with rare loot', type: 'hunt', timeLeft: '3d 2h', participants: 2156, icon: 'gift', color: '#7C3AED' },
];

export const SOCIAL_POSTS: Post[] = [
  { id: 'p1', userId: 'u2', username: 'NightHawk99', clan: 'Cyber Sharks', timeAgo: '2m ago', content: 'Just captured the entire Neon District east wing! 🎯 Our clan is unstoppable this season.', territory: 'Neon District', likes: 142, comments: 23, type: 'conquest', liked: false },
  { id: 'p2', userId: 'u3', username: 'StormKing', clan: 'Storm Riders', timeAgo: '8m ago', content: 'Reached Level 50 today after 3 months of grinding 💪 Gold → Diamond rank up incoming!', likes: 387, comments: 61, type: 'achievement', liked: true },
  { id: 'p3', userId: 'u4', username: 'NeonViper', clan: 'Neon Wolves', timeAgo: '15m ago', content: 'City War is insane right now. We\'re defending Tech Hub from 3 clans simultaneously. Who\'s coming to help?', territory: 'Tech Hub', likes: 89, comments: 44, type: 'event', liked: false },
  { id: 'p4', userId: 'u5', username: 'IronPhoenix_X', clan: 'Iron Phoenix', timeAgo: '32m ago', content: 'Completed the weekly Treasure Hunt in under 2 hours. Legendary skin DROP! ⚡', likes: 521, comments: 97, type: 'achievement', liked: false },
  { id: 'p5', userId: 'u6', username: 'ShadowByte', clan: 'Blood Ravens', timeAgo: '1h ago', content: 'Gold Rush Quarter is ours now. Anyone want to challenge us? 😈', territory: 'Gold Rush Quarter', likes: 203, comments: 38, type: 'conquest', liked: true },
  { id: 'p6', userId: 'u7', username: 'CrystalRunr', clan: 'Green Serpents', timeAgo: '2h ago', content: 'Morning route completed! 12km commute turned into a territory sweep. Streak hits 30 days 🔥', likes: 178, comments: 19, type: 'status', liked: false },
];

export const STORIES: Story[] = [
  { id: 's0', username: 'You', isActive: false, isUser: true },
  { id: 's1', username: 'NightHawk', isActive: true },
  { id: 's2', username: 'StormKng', isActive: true },
  { id: 's3', username: 'NeonViper', isActive: true },
  { id: 's4', username: 'IronPhx', isActive: true },
  { id: 's5', username: 'ShdwByte', isActive: false },
  { id: 's6', username: 'CrystalR', isActive: true },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'First Blood', icon: 'flame', rarity: 'common', unlocked: true },
  { id: 'a2', title: 'Conqueror', icon: 'flag', rarity: 'rare', unlocked: true },
  { id: 'a3', title: 'Streak King', icon: 'flash', rarity: 'rare', unlocked: true },
  { id: 'a4', title: 'City Dominator', icon: 'trophy', rarity: 'epic', unlocked: true },
  { id: 'a5', title: 'Legend', icon: 'star', rarity: 'legendary', unlocked: false },
  { id: 'a6', title: 'Speed Runner', icon: 'stopwatch', rarity: 'epic', unlocked: false },
  { id: 'a7', title: 'Social King', icon: 'people', rarity: 'common', unlocked: true },
  { id: 'a8', title: 'Night Owl', icon: 'moon', rarity: 'rare', unlocked: true },
];

export const LEADERBOARD = [
  { rank: 1, name: 'ZephyrX', clan: 'NW', xp: 124800, level: 67, change: 0 },
  { rank: 2, name: 'NightHawk99', clan: 'CS', xp: 118200, level: 64, change: 1 },
  { rank: 3, name: 'StormKing', clan: 'SR', xp: 109500, level: 61, change: -1 },
  { rank: 4, name: 'IronPhoenix_X', clan: 'IP', xp: 98400, level: 58, change: 2 },
  { rank: 5, name: 'ShadowByte', clan: 'BR', xp: 91200, level: 55, change: 0 },
  { rank: 6, name: 'NeonViper', clan: 'NW', xp: 87600, level: 53, change: -2 },
  { rank: 7, name: 'CrystalRunner', clan: 'GS', xp: 82000, level: 51, change: 3 },
  { rank: 8, name: 'Alex Cipher', clan: 'NW', xp: 74200, level: 34, change: 1, isUser: true },
];

export const RANK_TIERS = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Elite', 'Legend'];
