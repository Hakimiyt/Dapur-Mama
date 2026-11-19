import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import Chip from '../components/Chip';
import InputField from '../components/InputField';
import { useRecipes } from '../context/RecipeContext';
import { validateRecipe } from '../utils/validation';
import { log } from '../utils/log';
import { colors, radius, space, type, CATEGORIES } from '../theme';

// Skrin 03 (Tambah), 04 (Semakan ralat) dan 06 (Edit) — satu komponen, dua mod.
export default function RecipeFormScreen({ navigation, route }) {
  const editId = route.params?.id;
  const { getRecipe, addRecipe, updateRecipe } = useRecipes();
  const existing = editId ? getRecipe(editId) : null;
  const isEdit = !!existing;

  const [form, setForm] = useState({
    name: existing?.name ?? '',
    category: existing?.category ?? '',
    minutes: existing ? String(existing.minutes) : '',
    ingredients: existing?.ingredients ?? '',
    steps: existing?.steps ?? '',
    photoUri: existing?.photoUri ?? null,
  });
  const [errors, setErrors] = useState({});
  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Kebenaran diperlukan', 'Benarkan akses galeri untuk memilih foto hidangan.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7, allowsEditing: true, aspect: [16, 9] });
    if (!res.canceled) set('photoUri')(res.assets[0].uri);
  };

  const onSave = async () => {
    const { errors: errs, isValid } = validateRecipe(form);
    setErrors(errs);
    log('validate ->', isValid ? 'SAH' : errs);
    if (!isValid) return;
    const payload = {
      name: form.name.trim(),
      category: form.category,
      minutes: Number(form.minutes),
      ingredients: form.ingredients.trim(),
      steps: form.steps.trim(),
      photoUri: form.photoUri,
    };
    if (isEdit) {
      await updateRecipe(existing.id, payload);
      navigation.goBack();
    } else {
      const r = await addRecipe(payload);
      navigation.replace('RecipeDetail', { id: r.id });
    }
  };

  const errCount = Object.values(errors).filter(Boolean).length;

  return (
    <View style={styles.root}>
      <AppBar />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={type.h1}>{isEdit ? 'Edit Resepi' : 'Tambah Resepi'}</Text>
          <View style={{ gap: space.xs }}>
            <Text style={type.h2}>{isEdit ? 'Sedapnya, kita simpan.' : 'Catat air tangan anda.'}</Text>
            {errCount > 0 ? (
              <Text style={[type.caption, { color: colors.danger }]}>{`Semak ${errCount} ruangan yang ditandakan di bawah.`}</Text>
            ) : (
              <Text style={type.caption}>
                {isEdit ? 'Kemas kini resepi kegemaran keluarga.' : 'Ruangan bertanda * wajib diisi.'}
              </Text>
            )}
          </View>

          <View style={{ gap: space.xs }}>
            {form.photoUri && <Image source={{ uri: form.photoUri }} style={styles.photo} />}
            <Button
              variant="secondary"
              label={form.photoUri ? 'Tukar foto hidangan' : '+  Tambah foto hidangan'}
              onPress={pickPhoto}
            />
            <Text style={type.caption}>Pilihan • JPG atau PNG</Text>
          </View>

          <InputField
            label="Nama Resepi *"
            placeholder="Contoh: Nasi Lemak Mama"
            value={form.name}
            onChangeText={set('name')}
            error={errors.name}
            testID="input-name"
          />

          <View style={{ gap: space.sm }}>
            <Text style={type.label}>Kategori *</Text>
            <View style={styles.chips}>
              {CATEGORIES.map((c) => (
                <Chip key={c} label={c} selected={form.category === c} onPress={() => set('category')(c)} />
              ))}
            </View>
            {errors.category && <Text style={[type.caption, { color: colors.danger }]}>{errors.category}</Text>}
          </View>

          <InputField
            label="Masa Memasak (minit) *"
            placeholder="Contoh: 30"
            keyboardType="number-pad"
            value={form.minutes}
            onChangeText={set('minutes')}
            error={errors.minutes}
            testID="input-minutes"
          />

          <InputField
            label="Bahan-bahan *"
            multiline
            placeholder={'Contoh: 1 cawan beras\n100 ml santan\n1 helai daun pandan'}
            value={form.ingredients}
            onChangeText={set('ingredients')}
            error={errors.ingredients}
            hint="Satu bahan setiap baris"
          />

          <InputField
            label="Langkah Memasak *"
            multiline
            placeholder={'1. Tulis langkah pertama di sini.\n2. Sambung langkah seterusnya.'}
            value={form.steps}
            onChangeText={set('steps')}
            error={errors.steps}
            hint="Susun langkah mengikut urutan"
          />
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footer}>
          <Button label={isEdit ? 'Simpan Perubahan' : 'Simpan Resepi'} onPress={onSave} testID="btn-save" />
          <Text style={[type.caption, { textAlign: 'center', marginTop: space.md }]}>Dapur Mama • Resepi anda, kenangan kita</Text>
          <BottomNav navigation={navigation} active="add" style={{ marginHorizontal: -space.xl }} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  content: { padding: space.xl, gap: space.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  photo: { width: '100%', height: 180, borderRadius: radius.lg, marginBottom: space.xs },
  footer: { paddingHorizontal: space.xl, paddingTop: space.md, backgroundColor: colors.bgApp },
});
