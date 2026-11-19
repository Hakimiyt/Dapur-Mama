import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function BrandMark({ compact = false }) {
  return (
    <View style={[styles.mark, compact && styles.compact]}>
      <View style={[styles.inner, compact && styles.innerCompact]}>
        <Text style={[styles.topText, compact && styles.topTextCompact]}>Dapur</Text>
        <Text style={[styles.bottomText, compact && styles.bottomTextCompact]}>Mama</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 2,
    borderColor: colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  compact: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  inner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCompact: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  topText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    lineHeight: 13,
    color: colors.primary,
  },
  topTextCompact: {
    fontSize: 7,
    lineHeight: 8,
  },
  bottomText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    lineHeight: 13,
    color: colors.primary,
  },
  bottomTextCompact: {
    fontSize: 7,
    lineHeight: 8,
  },
});
