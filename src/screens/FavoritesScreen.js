import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
import { colors, space, type } from '../theme';

export default function FavoritesScreen({ navigation }) {
  const { recipes, toggleFavorite } = useRecipes();
  const favorites = recipes.filter((recipe) => recipe.favorite);

  const Header = (
    <View style={styles.header}>
      <Text style={type.h1}>Resepi Kegemaran</Text>
      <Text style={type.body}>Resepi pilihan anda yang disimpan dengan ikon hati.</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <AppBar />
      <FlatList
        data={favorites}
        keyExtractor={(recipe) => recipe.id}
        ListHeaderComponent={Header}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada resepi kegemaran. Tekan ikon hati pada resepi untuk menyimpannya di sini.
          </Text>
        }
        ItemSeparatorComponent={() => <View style={{ height: space.md }} />}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <BottomNav navigation={navigation} active="profile" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  list: { flexGrow: 1, padding: space.xl, paddingBottom: space.xl, gap: space.xl },
  header: { gap: space.sm },
  empty: { ...type.body, textAlign: 'center', paddingVertical: space.xl },
  footer: { backgroundColor: colors.surface },
});
