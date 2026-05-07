import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';
import { Post } from '@/constants/data';

type Props = { post: Post };

const TYPE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  conquest: 'flag',
  achievement: 'trophy',
  event: 'flash',
  status: 'chatbubble',
};

const TYPE_COLORS: Record<string, string> = {
  conquest: COLORS.primary,
  achievement: COLORS.gold,
  event: COLORS.red,
  status: COLORS.accent,
};

export default function SocialPost({ post }: Props) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const color = TYPE_COLORS[post.type] || COLORS.primary;

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(prev => {
      setLikeCount(c => prev ? c - 1 : c + 1);
      return !prev;
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: color + '33' }]}>
          <Text style={[styles.avatarText, { color }]}>{post.username[0]}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.username}>{post.username}</Text>
            <View style={[styles.typeBadge, { backgroundColor: color + '22' }]}>
              <Ionicons name={TYPE_ICONS[post.type]} size={9} color={color} />
            </View>
          </View>
          <Text style={styles.meta}>{post.clan} · {post.timeAgo}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.territory && (
        <View style={styles.territoryBadge}>
          <Ionicons name="location" size={11} color={COLORS.accent} />
          <Text style={styles.territoryText}>{post.territory}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={handleLike} activeOpacity={0.8}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={18}
            color={liked ? COLORS.red : COLORS.foregroundMuted}
          />
          <Text style={[styles.actionCount, liked && { color: COLORS.red }]}>{likeCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} activeOpacity={0.8}>
          <Ionicons name="chatbubble-outline" size={17} color={COLORS.foregroundMuted} />
          <Text style={styles.actionCount}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} activeOpacity={0.8}>
          <Ionicons name="share-outline" size={18} color={COLORS.foregroundMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: COLORS.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    gap: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700' },
  userInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  username: { fontSize: 14, fontWeight: '700', color: COLORS.foreground },
  typeBadge: { padding: 4, borderRadius: 8 },
  meta: { fontSize: 12, color: COLORS.foregroundMuted },
  content: { fontSize: 14, color: COLORS.foreground, lineHeight: 20 },
  territoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.accentDim + '66',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  territoryText: { fontSize: 11, color: COLORS.accentLight },
  actions: { flexDirection: 'row', gap: 20, paddingTop: 4 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionCount: { fontSize: 13, color: COLORS.foregroundMuted },
});
