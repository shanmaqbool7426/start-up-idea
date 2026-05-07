import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { SOCIAL_POSTS, STORIES } from '@/constants/data';
import SocialPost from '@/components/SocialPost';
import StoryCircle from '@/components/StoryCircle';

export default function SocialScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="options-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="paper-plane-outline" size={22} color={COLORS.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad + 100 }]}
      >
        <View style={styles.storiesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesScroll}>
            {STORIES.map(story => (
              <StoryCircle key={story.id} story={story} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterRow}>
          {['All', 'Conquests', 'Achievements', 'Events'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, filter === 'All' && styles.filterChipActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, filter === 'All' && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.activityBanner}>
          <Ionicons name="pulse" size={14} color={COLORS.green} />
          <Text style={styles.activityText}>
            <Text style={{ color: COLORS.green }}>847 players</Text> active near you right now
          </Text>
        </View>

        {SOCIAL_POSTS.map(post => (
          <SocialPost key={post.id} post={post} />
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
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.foreground,
    fontFamily: 'Orbitron_700Bold',
  },
  headerRight: { flexDirection: 'row', gap: 4 },
  iconBtn: { padding: 8 },
  scrollContent: { paddingHorizontal: 16 },
  storiesSection: { marginHorizontal: -16, marginBottom: 16 },
  storiesScroll: { paddingHorizontal: 16, gap: 8 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primaryDim,
    borderColor: COLORS.primary,
  },
  filterText: { fontSize: 13, color: COLORS.foregroundMuted, fontWeight: '600' },
  filterTextActive: { color: COLORS.primaryLight },
  activityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.green + '11',
    borderRadius: COLORS.radiusSm,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.green + '33',
  },
  activityText: { fontSize: 13, color: COLORS.foregroundMuted },
});
