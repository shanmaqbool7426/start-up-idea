import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';
import { Story } from '@/constants/data';

type Props = { story: Story };

export default function StoryCircle({ story }: Props) {
  const handlePress = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={[
        styles.ring,
        story.isActive && styles.activeRing,
        story.isUser && styles.userRing,
      ]}>
        <View style={[styles.avatar, story.isUser && styles.userAvatar]}>
          {story.isUser ? (
            <View style={styles.addIcon}>
              <Text style={styles.addText}>+</Text>
            </View>
          ) : (
            <Text style={styles.letter}>{story.username[0]}</Text>
          )}
        </View>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {story.isUser ? 'Your Story' : story.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: 68, gap: 5 },
  ring: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 2,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  activeRing: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  userRing: { borderColor: COLORS.accentDim, borderStyle: 'dashed' },
  avatar: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: COLORS.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: { backgroundColor: COLORS.primaryDim },
  letter: { fontSize: 22, fontWeight: '700', color: COLORS.foreground },
  addIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontSize: 18, lineHeight: 22, fontWeight: '700' },
  name: { fontSize: 10, color: COLORS.foregroundMuted, textAlign: 'center', maxWidth: 64 },
});
