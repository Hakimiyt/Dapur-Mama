import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import { colors, radius, space, type } from '../theme';

export default function ContactScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <AppBar
        title="Hubungi Kami"
        showBrand={false}
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={type.h1}>Hubungi Kami</Text>
        <Text style={[type.body, styles.description]}>
          Kami sedia mendengar maklum balas dan cadangan anda.
        </Text>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name="mail-outline" size={24} color={colors.primary} />
          </View>
          <Text style={type.label}>E-mel</Text>
          <Text style={type.bodyLarge}>dmsupport@gmail.com</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  content: { flexGrow: 1, padding: space.xl, gap: space.lg },
  description: { marginTop: -space.md },
  card: {
    alignItems: 'center',
    padding: space.xl,
    gap: space.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.orange100,
  },
  note: { textAlign: 'center' },
});
