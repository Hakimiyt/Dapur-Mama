import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius, space, type } from '../theme';

export default function Chip({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected ? styles.on : styles.off]}
    >
      <Text style={[type.chip, { color: selected ? colors.onPrimary : colors.textSecondary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  on: { backgroundColor: colors.primary, borderColor: colors.primary },
  off: { backgroundColor: colors.surface, borderColor: colors.borderStrong },
});
