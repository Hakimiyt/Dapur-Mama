import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import sampleRecipeImages from '../data/sampleRecipeImages';

// Papar foto resepi; jika tiada foto, papar ikon sementara.
export default function Thumbnail({ uri, recipeId, style, iconSize = 28 }) {
  const source = uri ? { uri } : sampleRecipeImages[recipeId];
  if (source) return <Image source={source} style={style} resizeMode="cover" />;
  return (
    <View style={[style, { backgroundColor: colors.orange100, alignItems: 'center', justifyContent: 'center' }]}>
      <Ionicons name="restaurant-outline" size={iconSize} color={colors.orange700} />
    </View>
  );
}
