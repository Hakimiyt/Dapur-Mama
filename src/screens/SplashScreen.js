import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '../components/BrandMark';
import Button from '../components/Button';
import { colors, space, type } from '../theme';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <BrandMark />
        <View style={styles.titleWrap}>
          <Text style={[type.body, styles.subtitle]}>
            Simpan rasa, kongsi cerita.
          </Text>
        </View>
        <Button
          label="Ayuh Mulakan!"
          onPress={() => navigation.replace('Login')}
          style={styles.button}
          testID="btn-start"
        />
      </View>
      <Text style={styles.footer}>RESEPI KELUARGA, SATU TEMPAT</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: space.xl,
  },
  titleWrap: {
    alignItems: 'center',
    marginTop: space.xl,
  },
  subtitle: {
    marginTop: space.sm,
  },
  button: {
    position: 'absolute',
    left: space.xl,
    right: space.xl,
    bottom: 24,
  },
  footer: {
    ...type.caption,
    textAlign: 'center',
    marginBottom: 58,
  },
});
