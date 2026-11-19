import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import Chip from '../components/Chip';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { useRecipes } from '../context/RecipeContext';
import { colors, space, type, CATEGORIES } from '../theme';

export default function SearchScreen({ navigation }) {
  const { recipes, toggleFavorite } = useRecipes();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filtered = useMemo(
    () =>
      recipes.filter((recipe) => {
        const matchesCategory = filter === 'Semua' || recipe.category === filter;
        const searchableText = `${recipe.name} ${recipe.category} ${recipe.ingredients}`.toLocaleLowerCase();
        return matchesCategory && searchableText.includes(normalizedQuery);
      }),
    [recipes, filter, normalizedQuery]
  );

  const goDetail = (id) => navigation.navigate('RecipeDetail', { id });
  const onToggleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
    } catch {
      Alert.alert('Tidak dapat menyimpan', 'Perubahan kegemaran tidak dapat disimpan. Cuba lagi.');
    }
  };
  const Header = (
    <View style={styles.header}>
      <View style={{ gap: space.sm }}>
        <Text style={type.h1}>Cari resepi</Text>
        <Text style={type.body}>Cari nama menu, bahan atau kategori.</Text>
      </View>
      <SearchBar value={query} onChangeText={setQuery} />
      <View style={styles.chips}>
        {['Semua', ...CATEGORIES].map((category) => (
          <Chip
            key={category}
            label={category}
            selected={filter === category}
            onPress={() => setFilter(category)}
          />
        ))}
      </View>
      <Text style={type.caption}>{`${filtered.length} resepi dijumpai`}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <AppBar />
      <FlatList
        data={filtered}
        keyExtractor={(recipe) => recipe.id}
        ListHeaderComponent={Header}
        ListEmptyComponent={
          <Text style={styles.empty}>Tiada resepi dijumpai. Cuba carian lain.</Text>
        }
        ItemSeparatorComponent={() => <View style={{ height: space.md }} />}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => goDetail(item.id)}
            onToggleFavorite={() => onToggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <BottomNav navigation={navigation} active="search" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  list: { padding: space.xl, paddingBottom: space.xl, gap: space.xl },
  header: { gap: space.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  empty: { ...type.body, textAlign: 'center', paddingVertical: space.xl },
  footer: { backgroundColor: colors.surface },
});
