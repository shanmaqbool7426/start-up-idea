import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  label: string;
  focused: boolean;
};

function TabIcon({ name, color, size, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Ionicons name={name} size={size} color={color} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
}

function RunIcon({ color, size, focused }: { color: string; size: number; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons name="walk" size={size} color={color} />
      <Text style={[styles.tabLabel, { color }]}>Start Run</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.foregroundDim,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border }]} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="globe-outline" color={color} size={size} label="Play" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="calendar-outline" color={color} size={size} label="Plan" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="person-outline" color={color} size={size} label="Me" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="people-outline" color={color} size={size} label="Feed" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="run"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <RunIcon color={focused ? COLORS.primary : COLORS.foregroundDim} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'web' ? 84 : 84,
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
