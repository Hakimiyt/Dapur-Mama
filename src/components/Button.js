import React from 'react';
import { ActivityIndicator, Pressable, Text, StyleSheet, View } from 'react-native';
import { colors, radius, space, type } from '../theme';

// variant: primary | secondary | danger  (ikut komponen Button di Figma)
export default function Button({ label, onPress, variant = 'primary', style, testID, loading = false, disabled = false }) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        boxStyles[variant],
        (disabled || loading) && styles.disabled,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {loading ? (
        <View style={styles.loadingContent}>
          <ActivityIndicator size="small" color={textStyles[variant].color} />
          <Text style={[type.button, textStyles[variant]]}>{label}</Text>
        </View>
      ) : (
        <Text style={[type.button, textStyles[variant]]}>{label}</Text>
      )}
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
  loadingContent: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  disabled: { opacity: 0.7 },
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
