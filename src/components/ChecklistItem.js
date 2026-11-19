import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, space, type } from '../theme';

export default function ChecklistItem({ text, checked, onToggle }) {
  return (
    <Pressable onPress={onToggle} style={styles.row} accessibilityRole="checkbox" accessibilityState={{ checked }}>
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked && <Ionicons name="checkmark" size={16} color={colors.onPrimary} />}
      </View>
      <Text style={[type.bodyLarge, { flex: 1 }, checked && styles.done]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: space.sm },
  box: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: colors.borderStrong,
    alignItems: 'center', justifyContent: 'center',
  },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  done: { color: colors.textTertiary, textDecorationLine: 'line-through' },
});
