import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

const tabs = [
  { key: 'home', label: 'Home', icon: 'home-outline', screen: 'RecipeList' },
  { key: 'add', label: 'Tambah resepi', icon: 'add-outline', screen: 'RecipeForm' },
  { key: 'search', label: 'Search', icon: 'search-outline', screen: 'Search' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', screen: 'Profile' },
];

export default function BottomNav({ navigation, active = 'home', style }) {
  const navigate = (tab) => {
    navigation.navigate(tab.screen);
  };

  return (
    <View style={[styles.bar, style]}>
      {tabs.map((tab) => {
        const selected = active === tab.key;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected }}
            onPress={() => navigate(tab)}
            style={styles.item}
          >
            <Ionicons name={tab.icon} size={22} color={selected ? colors.primary : colors.textSecondary} />
            <Text style={[styles.label, selected && styles.selectedLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: 4,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  label: { fontFamily: fonts.body, fontSize: 10, color: colors.textSecondary },
  selectedLabel: { fontFamily: fonts.semibold, color: colors.primary },
});
