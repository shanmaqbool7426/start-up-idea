import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';
import { FEED_POSTS, RunPost, CURRENT_USER } from '@/constants/data';

type FeedTab = 'explore' | 'groups' | 'following';

function RunMapPreview({ color }: { color: string }) {
  return (
    <View style={[styles.mapPreview, { backgroundColor: '#1A2230' }]}>
      <View style={[styles.mapOverlay, { backgroundColor: color + '22' }]} />
      <View style={styles.mapRoute}>
        <View style={[styles.routeDot, { backgroundColor: COLORS.primary }]} />
        <View style={[styles.routeLine, { borderColor: COLORS.primary }]} />
        <View style={[styles.routeDot, { backgroundColor: COLORS.primary }]} />
      </View>
      <Text style={styles.mapAreaLabel}>ST KILDA</Text>
      <Text style={[styles.mapAreaLabel, { bottom: 10, right: 12, top: undefined }]}>RIPPONLEA</Text>
    </View>
  );
}

function PostCard({ post }: { post: RunPost }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (Platform.OS !== 'web') { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }
    setLiked(p => { setLikeCount(c => p ? c - 1 : c + 1); return !p; });
  };

  const avatarColors = ['#FF6B6B', '#4B9FFF', '#4CAF50', '#AB47BC', '#FF7043'];
  const avatarColor = avatarColors[post.username.charCodeAt(0) % avatarColors.length];

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={[styles.postAvatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.postAvatarText}>{post.avatar}</Text>
          <View style={styles.levelPill}>
            <Text style={styles.levelPillText}>L{post.level}</Text>
          </View>
        </View>
        <View style={styles.postMeta}>
          <Text style={styles.postUsername}>{post.username}</Text>
          <Text style={styles.postSub}>{post.timeAgo} · {post.location}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={18} color={COLORS.foregroundDim} />
      </View>

      <Text style={styles.postRunType}>{post.runType}</Text>
      <Text style={styles.postGroup}>{post.groupName}</Text>

      <RunMapPreview color={avatarColor} />

      {post.milestone && (
        <View style={styles.milestoneBadge}>
          <Ionicons name="star" size={9} color={COLORS.foreground} />
          <Text style={styles.milestoneText}>{post.milestone}</Text>
        </View>
      )}

      <View style={styles.postStats}>
        <View style={styles.postStat}>
          <Text style={styles.postStatVal}>{post.distance}</Text>
          <Text style={styles.postStatLabel}>Distance</Text>
        </View>
        <View style={styles.postStat}>
          <Text style={styles.postStatVal}>{post.duration}</Text>
          <Text style={styles.postStatLabel}>Duration</Text>
        </View>
        <View style={styles.postStat}>
          <Text style={styles.postStatVal}>{post.pace}</Text>
          <Text style={styles.postStatLabel}>Avg Pace</Text>
        </View>
        <View style={styles.postActions}>
          <TouchableOpacity onPress={handleLike} style={styles.postAction}>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? COLORS.primary : COLORS.foregroundMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="chatbubble-outline" size={19} color={COLORS.foregroundMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const [tab, setTab] = useState<FeedTab>('explore');

  const avatarColor = '#FF6B6B';

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={[styles.headerAvatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.headerAvatarText}>{CURRENT_USER.avatar}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FEED</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color={COLORS.foreground} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabRow}>
        {(['explore', 'groups', 'following'] as FeedTab[]).map(t => (
          <TouchableOpacity key={t} style={styles.tabBtn} onPress={() => setTab(t)} activeOpacity={0.8}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
            {tab === t && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 96 }]}
      >
        {FEED_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.foreground,
    letterSpacing: 2,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
  },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 12, position: 'relative' },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.foregroundMuted },
  tabTextActive: { color: COLORS.foreground },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: COLORS.foreground,
    borderRadius: 1,
  },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12 },
  postCard: {
    marginBottom: 0,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  postAvatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  levelPill: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    backgroundColor: COLORS.cardAlt,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  levelPillText: { fontSize: 8, color: COLORS.foreground, fontWeight: '700' },
  postMeta: { flex: 1 },
  postUsername: { fontSize: 14, fontWeight: '700', color: COLORS.foreground },
  postSub: { fontSize: 11, color: COLORS.foregroundMuted, marginTop: 1 },
  postRunType: { fontSize: 15, fontWeight: '700', color: COLORS.foreground, marginBottom: 2 },
  postGroup: { fontSize: 12, color: COLORS.foregroundMuted, marginBottom: 10 },
  mapPreview: {
    height: 160,
    borderRadius: COLORS.radiusSm,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  mapOverlay: { ...StyleSheet.absoluteFillObject },
  mapRoute: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    alignItems: 'center',
  },
  routeDot: { width: 8, height: 8, borderRadius: 4 },
  routeLine: {
    width: 2,
    height: 60,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    marginVertical: 2,
  },
  mapAreaLabel: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
  },
  milestoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  milestoneText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  postStats: { flexDirection: 'row', alignItems: 'center' },
  postStat: { flex: 1 },
  postStatVal: { fontSize: 14, fontWeight: '700', color: COLORS.foreground },
  postStatLabel: { fontSize: 10, color: COLORS.foregroundMuted },
  postActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  postAction: { padding: 4 },
});
