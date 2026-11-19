import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BrandMark from './BrandMark';
import { colors, space, type } from '../theme';

export default function AppBar({ title = 'Dapur Mama', showBack = false, showBrand = true, onBack }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        {showBack && (
          <Pressable onPress={onBack} hitSlop={12} accessibilityLabel="Kembali">
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
        )}
        {showBrand && <BrandMark compact />}
        <Text style={[type.h3, styles.title]} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  bar: { height: 56, flexDirection: 'row', alignItems: 'center', gap: space.md, paddingHorizontal: space.lg },
  title: { flex: 1 },
});
