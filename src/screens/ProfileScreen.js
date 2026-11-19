import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import StatTile from '../components/StatTile';
import { useRecipes } from '../context/RecipeContext';
import { loadSession } from '../storage/authStorage';
import { colors, radius, space, type } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { recipes } = useRecipes();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    loadSession().then(setAccount);
  }, []);

  return (
    <View style={styles.root}>
      <AppBar />
      <View style={styles.content}>
        <Text style={type.h1}>Profil</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={34} color={colors.primary} />
          </View>
          <Text style={type.h2}>{account?.name || 'Mama Dapur'}</Text>
          <Text style={type.body}>{account?.email || 'mama@dapurmama.com'}</Text>
          {!account && <Text style={type.caption}>Profil contoh</Text>}
        </View>
        <View style={styles.stats}>
          <StatTile label="Jumlah resepi" value={String(recipes.length)} />
          <StatTile label="Kegemaran" value={String(recipes.filter((recipe) => recipe.favorite).length)} />
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('Favorites')}
          style={styles.favoriteLink}
        >
          <Ionicons name="heart" size={22} color={colors.danger} />
          <View style={styles.favoriteInfo}>
            <Text style={type.label}>Resepi Kegemaran</Text>
            <Text style={type.caption}>Lihat resepi yang anda simpan</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.note}>
          <Text style={type.h3}>Dapur Mama</Text>
          <Text style={type.body}>Simpan rasa, kongsi cerita.</Text>
        </View>
      </View>
      <SafeAreaView edges={['bottom']} style={styles.bottom}>
        <BottomNav navigation={navigation} active="profile" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  content: { flex: 1, padding: space.xl, gap: space.xl },
  profileCard: {
    alignItems: 'center',
    gap: space.sm,
    padding: space.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange100,
  },
  stats: { flexDirection: 'row', gap: space.md },
  favoriteLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  favoriteInfo: { flex: 1, gap: space.xs },
  note: { padding: space.lg, gap: space.xs, borderRadius: radius.md, backgroundColor: colors.orange100 },
  bottom: { backgroundColor: colors.surface },
});
