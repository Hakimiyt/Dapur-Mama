import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, radius, space, type, fonts } from '../theme';

// Single (satu baris) atau multiline (bahan/langkah). `error` = state Error.
export default function InputField({ label, error, hint, multiline, style, ...rest }) {
  const hasError = !!error;
  return (
    <View style={styles.wrap}>
      <Text style={type.label}>{label}</Text>
      <TextInput
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholderTextColor={colors.textTertiary}
        style={[
          styles.field,
          multiline && styles.multi,
          hasError ? styles.errBorder : styles.normalBorder,
          style,
        ]}
        {...rest}
      />
      {hasError ? (
        <Text style={[type.caption, { color: colors.danger }]}>{error}</Text>
      ) : hint ? (
        <Text style={type.caption}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.xs },
  field: {
    backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: space.lg,
    paddingVertical: space.md, fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.text, height: 48,
  },
  multi: { height: 112 },
  normalBorder: { borderWidth: 1, borderColor: colors.borderStrong },
  errBorder: { borderWidth: 1.5, borderColor: colors.danger },
});
