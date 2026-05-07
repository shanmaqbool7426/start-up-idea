export const CURRENT_USER = {
  id: 'u1',
  name: 'Alex Cipher',
  username: 'alexcipher',
  level: 34,
  xp: 7420,
  maxXp: 9000,
  territory: 23.4,
  totalRuns: 47,
  streak: 12,
  clan: 'Neon Wolves',
  avatar: 'A',
};

export type RunPost = {
  id: string;
  username: string;
  avatar: string;
  level: number;
  location: string;
  timeAgo: string;
  runType: string;
  groupName: string;
  distance: string;
  duration: string;
  pace: string;
  milestone?: string;
  likes: number;
  comments: number;
  liked: boolean;
};

export const FEED_POSTS: RunPost[] = [
  {
    id: 'p1',
    username: 'Trent Randle',
    avatar: 'T',
    level: 35,
    location: 'Melbourne, Australia',
    timeAgo: 'an hour ago',
    runType: 'Free Run',
    groupName: 'SCTY strides',
    distance: '8.17KM',
    duration: '42:19',
    pace: '5:10/KM',
    milestone: '25TH RUN',
    likes: 24,
    comments: 3,
    liked: false,
  },
  {
    id: 'p2',
    username: 'Louis Phillips',
    avatar: 'L',
    level: 80,
    location: 'Melbourne, Australia',
    timeAgo: 'an hour ago',
    runType: 'Hard Interval',
    groupName: 'Melbourne INTVL Runners',
    distance: '6.20KM',
    duration: '38:44',
    pace: '6:15/KM',
    likes: 41,
    comments: 7,
    liked: true,
  },
  {
    id: 'p3',
    username: 'Ryan Parker',
    avatar: 'R',
    level: 22,
    location: 'Sydney, Australia',
    timeAgo: '2 hours ago',
    runType: 'Light Run',
    groupName: 'Sydney Runners',
    distance: '5.40KM',
    duration: '29:12',
    pace: '5:24/KM',
    likes: 16,
    comments: 2,
    liked: false,
  },
];

export type WeekDay = {
  day: string;
  date: string;
  distance?: string;
  runType?: string;
  status: 'rest' | 'next' | 'completed' | 'upcoming';
};

export const WEEK_PLAN: WeekDay[] = [
  { day: 'MON', date: '26 May', status: 'rest' },
  { day: 'TUE', date: '27 May', status: 'rest' },
  { day: 'WED', date: '28 May', distance: '4.6KM', runType: 'Light Run', status: 'next' },
  { day: 'THU', date: '29 May', distance: '4.54KM', runType: 'Jog', status: 'completed' },
  { day: 'TODAY', date: '30 May', distance: '2.3KM', runType: 'Moderate Run', status: 'upcoming' },
  { day: 'SAT', date: '31 May', status: 'rest' },
  { day: 'SUN', date: '1 Jun', status: 'rest' },
];

export const CLUB_LEADERBOARD = [
  { rank: 1, name: 'Antwerp World Domination...', territory: '1526.2', flagEmoji: '🇧🇪', color: '#8B0000' },
  { rank: 2, name: 'Team Germany', territory: '1525.0', flagEmoji: '🇩🇪', color: '#6B0000' },
  { rank: 3, name: 'Track & XC', territory: '1199.2', flagEmoji: '🇺🇸', color: '#5A0000' },
  { rank: 4, name: 'We are Belgium', territory: '1065.4', flagEmoji: '🇧🇪', color: '#520000' },
  { rank: 5, name: 'Neon Wolves', territory: '718.7', flagEmoji: '🇦🇺', color: '#3D0000', isMine: true },
  { rank: 6, name: 'Gnome Your Limits!', territory: '707.4', flagEmoji: '🇬🇧', color: '#380000' },
  { rank: 7, name: 'Trail Buddies Kempen', territory: '651.5', flagEmoji: '🇧🇪', color: '#330000' },
  { rank: 8, name: 'Spain and glory', territory: '639.1', flagEmoji: '🇪🇸', color: '#2E0000' },
];

export const BATTLES = [
  { id: '1', opponent: 'Ryan Parker', opponentAvatar: 'R', myCount: 7, theirCount: 5, myColor: '#AB47BC', theirColor: '#FF6B6B' },
  { id: '2', opponent: 'Richelle Cox', opponentAvatar: 'R', myCount: 2, theirCount: 5, myColor: '#FF7043', theirColor: '#FF6B6B' },
  { id: '3', opponent: 'Stuart Kempson', opponentAvatar: 'S', myCount: 2, theirCount: 4, myColor: '#4B9FFF', theirColor: '#FF6B6B' },
  { id: '4', opponent: 'Sandra Lyczba', opponentAvatar: 'S', myCount: 3, theirCount: 2, myColor: '#26C6DA', theirColor: '#FF6B6B' },
  { id: '5', opponent: 'Harley Taylor', opponentAvatar: 'H', myCount: 2, theirCount: 3, myColor: '#FF7043', theirColor: '#FF6B6B' },
];
