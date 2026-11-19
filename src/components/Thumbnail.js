import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Papar foto resepi; jika tiada foto, papar ikon sementara.
export default function Thumbnail({ uri, style, iconSize = 28 }) {
  if (uri) return <Image source={{ uri }} style={style} resizeMode="cover" />;
  return (
    <View style={[style, { backgroundColor: colors.orange100, alignItems: 'center', justifyContent: 'center' }]}>
      <Ionicons name="restaurant-outline" size={iconSize} color={colors.orange700} />
    </View>
  );
}
