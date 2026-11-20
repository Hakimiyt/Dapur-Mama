import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import Chip from '../components/Chip';
import InputField from '../components/InputField';
import NumberedLineField from '../components/NumberedLineField';
import { useRecipes } from '../context/RecipeContext';
import { toLines, validateRecipe } from '../utils/validation';
import { log } from '../utils/log';
import { colors, radius, space, type, CATEGORIES } from '../theme';

const initialLines = (value = '') => {
  const lines = toLines(value);
  return [...lines, ...Array(Math.max(0, 3 - lines.length)).fill('')];
};

const serializeLines = (lines) =>
  lines
    .map((line) => line.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
    .join('\n');

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
    ingredients: initialLines(existing?.ingredients),
    steps: initialLines(existing?.steps),
    photoUri: existing?.photoUri ?? null,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [pickingPhoto, setPickingPhoto] = useState(false);
  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const pickPhoto = async () => {
    setPickingPhoto(true);
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Kebenaran diperlukan', 'Benarkan akses galeri untuk memilih foto hidangan.');
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7, allowsEditing: true, aspect: [16, 9] });
      if (!res.canceled && res.assets?.[0]?.uri) set('photoUri')(res.assets[0].uri);
    } catch (error) {
      log('Pilih foto GAGAL', error);
      Alert.alert('Tidak dapat memilih foto', 'Cuba pilih foto sekali lagi.');
    } finally {
      setPickingPhoto(false);
    }
  };

  const onSave = async () => {
    if (saving) return;
    const ingredients = serializeLines(form.ingredients);
    const steps = serializeLines(form.steps);
    const { errors: errs, isValid } = validateRecipe({ ...form, ingredients, steps });
    setErrors(errs);
    log('validate ->', isValid ? 'SAH' : errs);
    if (!isValid) return;
    const payload = {
      name: form.name.trim(),
      category: form.category,
      minutes: Number(form.minutes),
      ingredients,
      steps,
      photoUri: form.photoUri,
    };
    setSaving(true);
    try {
      if (isEdit) {
        await updateRecipe(existing.id, payload);
        navigation.goBack();
      } else {
        const r = await addRecipe(payload);
        navigation.replace('RecipeDetail', { id: r.id });
      }
    } catch (error) {
      log('Simpan resepi GAGAL', error);
      Alert.alert('Tidak dapat menyimpan', 'Resepi anda belum disimpan. Cuba lagi.');
    } finally {
      setSaving(false);
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
              label={pickingPhoto ? 'Memilih foto...' : form.photoUri ? 'Tukar foto hidangan' : '+  Tambah foto hidangan'}
              onPress={pickPhoto}
              loading={pickingPhoto}
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

          <NumberedLineField
            label="Bahan-bahan *"
            lines={form.ingredients}
            onChangeLines={set('ingredients')}
            addLabel="Tambah bahan"
            placeholder="Contoh: 1 cawan beras"
            error={errors.ingredients}
            hint="Satu bahan setiap baris"
          />

          <View style={{ marginTop: space.sm }}>
            <NumberedLineField
              label="Langkah Memasak *"
              lines={form.steps}
              onChangeLines={set('steps')}
              addLabel="Tambah langkah"
              placeholder="Tulis langkah memasak"
              error={errors.steps}
              hint="Susun langkah mengikut urutan"
              multiline
            />
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footer}>
          <Button
            label={saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan Resepi'}
            onPress={onSave}
            loading={saving}
            testID="btn-save"
          />
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
  footer: { paddingHorizontal: space.xl, paddingTop: space.md, gap: space.lg, backgroundColor: colors.bgApp },
});
