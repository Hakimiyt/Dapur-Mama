import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, space, type } from '../theme';

export default function StatTile({ label, value }) {
  return (
    <View style={styles.tile}>
      <Text style={type.h3} numberOfLines={1}>{value}</Text>
      <Text style={type.caption}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1, backgroundColor: colors.muted, borderRadius: radius.md, alignItems: 'center',
    justifyContent: 'center', paddingHorizontal: space.sm, paddingVertical: space.md, gap: space.xs,
  },
});
