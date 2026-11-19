import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '../components/BrandMark';
import Button from '../components/Button';
import { colors, fonts, radius, space, type } from '../theme';
import { validateSignUp } from '../utils/validation';
import { registerAccount } from '../storage/authStorage';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const setField = (key, value) => {
    if (key === 'name') setName(value);
    if (key === 'email') setEmail(value);
    if (key === 'password') setPassword(value);
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback(null);
  };

  const signUp = async () => {
    if (submitting) return;
    const validation = validateSignUp({ name, email, password });
    setErrors(validation.errors);
    if (!validation.isValid) {
      setFeedback({ type: 'error', text: 'Semak ruangan yang ditandakan dan cuba lagi.' });
      return;
    }

    setSubmitting(true);
    try {
      const result = await registerAccount({ name, email, password });
      if (!result.ok) {
        setFeedback({ type: 'error', text: result.message });
        return;
      }
      goToRecipes();
    } catch {
      setFeedback({ type: 'error', text: 'Tidak dapat mendaftar sekarang. Cuba lagi.' });
    } finally {
      setSubmitting(false);
    }
  };

  const goToRecipes = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'RecipeList' }],
    });

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <BrandMark compact />
            <Text style={styles.brandName}>Dapur Mama</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Cipta akaun anda</Text>
            <Text style={[type.body, styles.description]}>
              Simpan resepi keluarga dan mulakan cerita dapur anda bersama kami.
            </Text>

            {feedback ? (
              <Text
                accessibilityRole="alert"
                style={[styles.feedback, styles.errorFeedback]}
              >
                {feedback.text}
              </Text>
            ) : null}

            <View style={styles.fieldGroup}>
              <Text style={type.label}>Nama penuh</Text>
              <TextInput
                value={name}
                onChangeText={(value) => setField('name', value)}
                placeholder="Contoh: Nur Aisyah"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                style={styles.input}
              />
              {errors.name ? <Text style={[type.caption, styles.error]}>{errors.name}</Text> : null}
              <Text style={type.caption}>Nama yang akan dipaparkan pada akun.</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={type.label}>E-mel</Text>
              <TextInput
                value={email}
                onChangeText={(value) => setField('email', value)}
                placeholder="nama@contoh.com"
                placeholderTextColor={colors.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
              {errors.email ? <Text style={[type.caption, styles.error]}>{errors.email}</Text> : null}
              <Text style={type.caption}>Gunakan e-mel yang aktif.</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={type.label}>Kata laluan</Text>
              <TextInput
                value={password}
                onChangeText={(value) => setField('password', value)}
                placeholder="Masukkan kata laluan"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry
                style={styles.input}
              />
              {errors.password ? <Text style={[type.caption, styles.error]}>{errors.password}</Text> : null}
              <Text style={type.caption}>Gunakan sekurang-kurangnya 8 aksara.</Text>
            </View>

            <Button
              label={submitting ? 'Mendaftar...' : 'Daftar akaun'}
              onPress={signUp}
              loading={submitting}
              style={styles.button}
              testID="btn-signup"
            />

            <Pressable
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>
                Sudah ada akaun? <Text style={styles.loginLinkText}>Log masuk</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  brandRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  brandName: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.text,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    marginTop: 38,
    paddingHorizontal: space.xl,
  },
  title: {
    ...type.h1,
  },
  description: {
    marginTop: space.sm,
  },
  fieldGroup: {
    marginTop: 24,
    gap: space.xs,
  },
  input: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    paddingHorizontal: space.lg,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    marginTop: 28,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: space.lg,
  },
  loginText: {
    ...type.caption,
  },
  loginLinkText: {
    color: colors.text,
  },
  error: {
    color: colors.danger,
  },
  feedback: { ...type.caption, padding: space.md, borderRadius: radius.md, borderWidth: 1 },
  errorFeedback: { color: colors.danger, backgroundColor: '#fef2f2', borderColor: '#fecaca' },
  footer: {
    ...type.caption,
    marginTop: 'auto',
    marginBottom: 12,
    paddingHorizontal: space.xl,
    textAlign: 'center',
  },
});
