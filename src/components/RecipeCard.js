import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Thumbnail from './Thumbnail';
import { colors, radius, space, type, shadowCard } from '../theme';

export default function RecipeCard({ recipe, onPress, onToggleFavorite }) {
  return (
    <Pressable onPress={onPress} style={styles.card} accessibilityRole="button">
      <Thumbnail uri={recipe.photoUri} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={type.h3} numberOfLines={1}>{recipe.name}</Text>
        <View style={styles.pill}>
          <Text style={[type.caption, { color: colors.onPrimary }]}>{recipe.category}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={type.caption}>{recipe.minutes} min</Text>
          <View style={{ flex: 1 }} />
          <Pressable onPress={onToggleFavorite} hitSlop={10} accessibilityLabel="Kegemaran">
            <Ionicons
              name={recipe.favorite ? 'heart' : 'heart-outline'}
              size={20}
              color={recipe.favorite ? colors.danger : colors.textSecondary}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md, minHeight: 106,
    backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    ...shadowCard,
  },
  thumb: { width: 72, height: 72, borderRadius: radius.md, overflow: 'hidden' },
  info: { flex: 1, gap: space.xs },
  pill: {
    alignSelf: 'flex-start', backgroundColor: colors.primarySubtle,
    paddingHorizontal: space.sm, paddingVertical: space.xs, borderRadius: radius.full,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
});
