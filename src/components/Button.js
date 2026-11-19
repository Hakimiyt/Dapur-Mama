import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius, space, type } from '../theme';

// variant: primary | secondary | danger  (ikut komponen Button di Figma)
export default function Button({ label, onPress, variant = 'primary', style, testID }) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.base, boxStyles[variant], pressed && { opacity: 0.85 }, style]}
    >
      <Text style={[type.button, textStyles[variant]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radius.md,
    paddingHorizontal: space.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const boxStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.primary },
  danger: { backgroundColor: colors.danger },
});

const textStyles = StyleSheet.create({
  primary: { color: colors.onPrimary },
  secondary: { color: colors.primary },
  danger: { color: colors.onPrimary },
});
