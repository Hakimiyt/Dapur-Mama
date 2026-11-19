import React from 'react';
import { View, Text, FlatList, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import RecipeCard from '../components/RecipeCard';
import Thumbnail from '../components/Thumbnail';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import { useRecipes } from '../context/RecipeContext';
import { colors, radius, space, type } from '../theme';

export default function RecipeListScreen({ navigation }) {
  const { recipes, loading, toggleFavorite } = useRecipes();

  const goAdd = () => navigation.navigate('RecipeForm');
  const goDetail = (id) => navigation.navigate('RecipeDetail', { id });

  // ---------- Skrin 02: Koleksi kosong ----------
  if (!loading && recipes.length === 0) {
    return (
      <View style={styles.root}>
        <AppBar />
        <ScrollView contentContainerStyle={styles.emptyContent}>
          <View style={styles.pad}>
          <Text style={type.h1}>Koleksi resepi</Text>
          <Text style={[type.body, { marginTop: space.lg }]}>Setiap resepi bermula dengan satu cerita.</Text>
          <View style={styles.emptyCard}>
            <View style={styles.bookIcon}>
              <Ionicons name="book-outline" size={32} color={colors.orange700} />
            </View>
            <Text style={[type.h2, { textAlign: 'center' }]}>Belum ada resepi</Text>
            <Text style={[type.body, { textAlign: 'center' }]}>
              Simpan resepi kegemaran keluarga supaya mudah dicari bila-bila masa.
            </Text>
            <Button label="+  Tambah resepi pertama" onPress={goAdd} style={{ alignSelf: 'stretch' }} testID="btn-add-first" />
          </View>
          <View style={styles.noteBox}>
            <Text style={[type.h3, { color: colors.orange900 }]}>Nota Mama</Text>
            <Text style={[type.body, { color: colors.orange900 }]}>
              Mulakan dengan satu hidangan yang paling anda suka masak.
            </Text>
          </View>
        </View>
        </ScrollView>
        <SafeAreaView edges={['bottom']} style={styles.bottomArea}>
          <BottomNav navigation={navigation} active="home" />
        </SafeAreaView>
      </View>
    );
  }

  // Resepi pilihan: kegemaran dahulu, jika tiada ambil yang terbaru
  const featured = recipes.find((r) => r.recommended) || recipes.find((r) => r.favorite) || recipes[0];
  const showFeatured = !!featured;

  const Header = (
    <View style={{ gap: space.xl }}>
      <View style={{ gap: space.sm }}>
        <Text style={[type.caption, { color: colors.orange700 }]}>RESEPI KELUARGA, SATU TEMPAT</Text>
        <Text style={type.h1}>Hari ini nak masak apa?</Text>
        <Text style={type.body}>Simpan rasa, kongsi cerita.</Text>
      </View>
      {showFeatured && (
        <Pressable style={styles.featured} onPress={() => goDetail(featured.id)}>
          <Thumbnail uri={featured.photoUri} style={styles.featuredImg} iconSize={48} />
          <View style={{ padding: space.lg, gap: space.sm }}>
            <Text style={[type.caption, { color: colors.orange700 }]}>
              {`PILIHAN MAMA  /  ${featured.category.toUpperCase()}`}
            </Text>
            <Text style={type.h2}>{featured.name}</Text>
            <Text style={type.caption}>{`${featured.minutes} minit   ·   Lihat resepi →`}</Text>
          </View>
        </Pressable>
      )}
      <Text style={type.h2}>Koleksi resepi</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <AppBar />
      <FlatList
        data={recipes.slice(0, 3)}
        keyExtractor={(r) => r.id}
        ListHeaderComponent={Header}
        ListEmptyComponent={
          <Text style={[type.body, { textAlign: 'center', paddingVertical: space.xl }]}>
            Tiada resepi dijumpai. Cuba kata kunci atau kategori lain.
          </Text>
        }
        ItemSeparatorComponent={() => <View style={{ height: space.md }} />}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => goDetail(item.id)} onToggleFavorite={() => toggleFavorite(item.id)} />
        )}
        contentContainerStyle={{ padding: space.xl, paddingBottom: space.xl, gap: space.xl }}
      />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <BottomNav
          navigation={navigation}
          active="home"
          style={{ marginHorizontal: -space.xl }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  pad: { padding: space.xl },
  featured: { backgroundColor: colors.surface, borderRadius: radius.lg, overflow: 'hidden' },
  featuredImg: { width: '100%', height: 190 },
  footer: { paddingHorizontal: space.xl, paddingTop: space.md, backgroundColor: colors.bgApp },
  bottomArea: { backgroundColor: colors.surface },
  emptyContent: { flexGrow: 1 },
  emptyCard: {
    marginTop: space.xl, padding: space.xl, gap: space.lg, alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
  },
  bookIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.orange100, alignItems: 'center', justifyContent: 'center' },
  noteBox: { marginTop: space.xl, backgroundColor: colors.orange100, borderRadius: radius.md, padding: space.lg, gap: space.sm },
});
