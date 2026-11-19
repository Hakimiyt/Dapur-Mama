import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import StatTile from '../components/StatTile';
import ConfirmDialog from '../components/ConfirmDialog';
import { useRecipes } from '../context/RecipeContext';
import { loadSession, logoutAccount } from '../storage/authStorage';
import { colors, radius, space, type } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { recipes } = useRecipes();
  const [account, setAccount] = useState(null);
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadSession().then(setAccount);
  }, []);

  const doLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logoutAccount();
      setLogoutDialogVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch {
      Alert.alert('Log keluar gagal', 'Tidak dapat log keluar sekarang. Cuba lagi.');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <View style={styles.root}>
      <AppBar />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('AboutUs')}
          style={styles.actionLink}
        >
          <Ionicons name="information-circle-outline" size={22} color={colors.primary} />
          <View style={styles.actionInfo}>
            <Text style={type.label}>Tentang Kami</Text>
            <Text style={type.caption}>Kenali aplikasi Dapur Mama</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('ContactUs')}
          style={styles.actionLink}
        >
          <Ionicons name="mail-outline" size={22} color={colors.primary} />
          <View style={styles.actionInfo}>
            <Text style={type.label}>Hubungi Kami</Text>
            <Text style={type.caption}>Lihat maklumat hubungan contoh</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => setLogoutDialogVisible(true)}
          style={styles.actionLink}
        >
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          <View style={styles.actionInfo}>
            <Text style={type.label}>Log Keluar</Text>
            <Text style={type.caption}>Keluar daripada akaun anda</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.note}>
          <Text style={type.h3}>Dapur Mama</Text>
          <Text style={type.body}>Simpan rasa, kongsi cerita.</Text>
        </View>
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.bottom}>
        <BottomNav navigation={navigation} active="profile" />
      </SafeAreaView>
      <ConfirmDialog
        visible={logoutDialogVisible}
        title="Log keluar?"
        message="Anda pasti mahu log keluar daripada akaun ini?"
        onCancel={() => !loggingOut && setLogoutDialogVisible(false)}
        onConfirm={doLogout}
        confirming={loggingOut}
        confirmLabel="Log keluar"
        confirmingLabel="Sedang log keluar..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  content: { flexGrow: 1, padding: space.xl, gap: space.xl },
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
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionInfo: { flex: 1, gap: space.xs },
  note: { padding: space.lg, gap: space.xs, borderRadius: radius.md, backgroundColor: colors.orange100 },
  bottom: { backgroundColor: colors.surface },
});
