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
import { validateLogin } from '../utils/validation';
import { loginAccount } from '../storage/authStorage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const setField = (key, value) => {
    if (key === 'email') setEmail(value);
    if (key === 'password') setPassword(value);
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFeedback(null);
  };

  const login = async () => {
    if (submitting) return;
    const validation = validateLogin({ email, password });
    setErrors(validation.errors);
    if (!validation.isValid) {
      setFeedback({ type: 'error', text: 'Semak ruangan yang ditandakan dan cuba lagi.' });
      return;
    }

    setSubmitting(true);
    try {
      const result = await loginAccount({ email, password });
      if (!result.ok) {
        setFeedback({ type: 'error', text: result.message });
        return;
      }
      goToRecipes();
    } catch {
      setFeedback({ type: 'error', text: 'Tidak dapat log masuk sekarang. Cuba lagi.' });
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
            <Text style={styles.title}>Selamat kembali</Text>
            <Text style={[type.body, styles.description]}>
              Log masuk untuk menyimpan resepi dan kenangan dari dapur anda
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
              <Text style={type.caption}>Gunakan e-mel yang didaftarkan.</Text>
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
              <Text style={type.caption}>Masukkan kata laluan akuan anda.</Text>
            </View>

            <Pressable style={styles.forgot} onPress={() => {}}>
              <Text style={styles.forgotText}>Lupa kata laluan?</Text>
            </Pressable>

            <Button
              label={submitting ? 'Sedang log masuk...' : 'Log masuk'}
              onPress={login}
              loading={submitting}
              testID="btn-login"
            />

            <Pressable
              style={styles.register}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.registerText}>
                Belum ada akaun? <Text style={styles.registerLink}>Daftar sekarang</Text>
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
    marginTop: 28,
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
  forgot: {
    alignSelf: 'flex-end',
    marginTop: space.md,
    marginBottom: 20,
  },
  forgotText: {
    ...type.label,
  },
  register: {
    alignItems: 'center',
    marginTop: space.lg,
  },
  registerText: {
    ...type.caption,
  },
  registerLink: {
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
