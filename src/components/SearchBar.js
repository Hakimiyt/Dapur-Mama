import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, space, fonts } from '../theme';

export default function SearchBar({ value, onChangeText, inputRef }) {
  return (
    <View style={styles.box}>
      <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder="Cari resepi..."
        placeholderTextColor={colors.textTertiary}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 44, flexDirection: 'row', alignItems: 'center', gap: space.sm,
    backgroundColor: colors.muted, borderRadius: radius.full, paddingHorizontal: space.lg,
  },
  input: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.text, padding: 0 },
});
