import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function BrandMark({ compact = false }) {
  return (
    <Image
      source={require('../../assets/brand/dapur-mama-logo.png')}
      resizeMode="contain"
      style={[styles.logo, compact && styles.compact]}
      accessibilityLabel="Logo Dapur Mama"
    />
  );
}

const styles = StyleSheet.create({
  logo: { width: 180, height: 180, borderRadius: 16, overflow: 'hidden' },
  compact: { width: 42, height: 42, borderRadius: 8 },
});
