import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, type, fonts } from '../theme';

export default function NumberedLineField({
  label,
  lines,
  onChangeLines,
  addLabel,
  placeholder,
  hint,
  error,
  multiline = false,
}) {
  const updateLine = (index, value) => {
    onChangeLines(lines.map((line, lineIndex) => (lineIndex === index ? value : line)));
  };

  return (
    <View style={styles.wrap}>
      <Text style={type.label}>{label}</Text>
      <View style={styles.lines}>
        {lines.map((line, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.number}>{index + 1}.</Text>
            <TextInput
              multiline={multiline}
              textAlignVertical={multiline ? 'top' : 'center'}
              value={line}
              onChangeText={(value) => updateLine(index, value)}
              placeholder={index === 0 ? placeholder : undefined}
              placeholderTextColor={colors.textTertiary}
              style={[styles.input, multiline && styles.multiline, error && styles.errorInput]}
            />
          </View>
        ))}
      </View>
      {error ? (
        <Text style={[type.caption, { color: colors.danger }]}>{error}</Text>
      ) : hint ? (
        <Text style={type.caption}>{hint}</Text>
      ) : null}
      <Pressable
        accessibilityRole="button"
        onPress={() => onChangeLines([...lines, ''])}
        style={styles.addButton}
      >
        <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
        <Text style={styles.addLabel}>{addLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.sm },
  lines: { gap: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  number: { width: 24, textAlign: 'right', fontFamily: fonts.semibold, fontSize: 14, color: colors.textSecondary },
  input: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  multiline: { minHeight: 56, textAlignVertical: 'top' },
  errorInput: { borderWidth: 1.5, borderColor: colors.danger },
  addButton: { flexDirection: 'row', alignItems: 'center', gap: space.xs, alignSelf: 'flex-start', paddingVertical: space.xs },
  addLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.primary },
});
