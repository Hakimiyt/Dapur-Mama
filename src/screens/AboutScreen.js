import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import { colors, radius, space, type } from '../theme';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <AppBar
        title="Tentang Kami"
        showBrand={false}
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.icon}>
          <Ionicons name="restaurant-outline" size={36} color={colors.orange700} />
        </View>
        <Text style={[type.h1, styles.title]}>Dapur Mama</Text>
        <Text style={[type.body, styles.description]}>
          Dapur Mama membantu anda menyimpan resepi keluarga, menyusun bahan-bahan
          dan mengikuti langkah memasak dalam satu tempat.
        </Text>
        <View style={styles.card}>
          <Text style={type.h3}>Simpan rasa, kongsi cerita.</Text>
          <Text style={type.body}>
            Setiap resepi menyimpan kenangan. Catat hidangan kegemaran anda supaya
            mudah dimasak dan dikongsi semula bersama keluarga.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  content: { flexGrow: 1, alignItems: 'center', padding: space.xl, gap: space.lg },
  icon: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.orange100,
  },
  title: { textAlign: 'center' },
  description: { textAlign: 'center' },
  card: {
    alignSelf: 'stretch',
    padding: space.lg,
    gap: space.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
