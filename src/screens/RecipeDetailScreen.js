import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import StatTile from '../components/StatTile';
import ChecklistItem from '../components/ChecklistItem';
import ConfirmDialog from '../components/ConfirmDialog';
import Thumbnail from '../components/Thumbnail';
import { useRecipes } from '../context/RecipeContext';
import { toLines } from '../utils/validation';
import { colors, radius, space, type } from '../theme';

// Skrin 05 (Butiran) + 07 (Pengesahan padam)
export default function RecipeDetailScreen({ navigation, route }) {
  const { getRecipe, deleteRecipe } = useRecipes();
  const recipe = getRecipe(route.params.id);
  const [checked, setChecked] = useState({});
  const [confirm, setConfirm] = useState(false);

  if (!recipe) return null; // selepas dipadam

  const ingredients = toLines(recipe.ingredients);
  const steps = toLines(recipe.steps);
  const edit = () => navigation.navigate('RecipeForm', { id: recipe.id });
  const askDelete = () => setConfirm(true);
  const doDelete = async () => {
    setConfirm(false);
    await deleteRecipe(recipe.id);
    navigation.popToTop();
  };

  return (
    <View style={styles.root}>
      <AppBar title="Butiran Resepi" showBrand={false} showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Thumbnail uri={recipe.photoUri} style={styles.photo} iconSize={56} />
        <View style={{ gap: space.sm }}>
          <Text style={[type.caption, { color: colors.orange700 }]}>{`${recipe.category.toUpperCase()}  /  RESEPI KELUARGA`}</Text>
          <Text style={type.h1}>{recipe.name}</Text>
        </View>

        <View style={styles.stats}>
          <StatTile label="Masa" value={`${recipe.minutes} min`} />
          <StatTile label="Kategori" value={recipe.category} />
          <StatTile label="Langkah" value={String(steps.length)} />
        </View>

        <View style={styles.ingredients}>
          <Text style={type.h2}>Bahan-bahan</Text>
          {ingredients.map((t, i) => (
            <ChecklistItem key={i} text={t} checked={!!checked[i]} onToggle={() => setChecked((c) => ({ ...c, [i]: !c[i] }))} />
          ))}
        </View>

        <View style={{ gap: space.md }}>
          <Text style={type.h2}>Langkah Memasak</Text>
          {steps.map((t, i) => (
            <View key={i} style={styles.step}>
              <View style={styles.stepNo}>
                <Text style={[type.label, { color: colors.orange900 }]}>{i + 1}</Text>
              </View>
              <Text style={[type.body, { flex: 1, color: colors.text }]}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <Button label="Edit Resepi" onPress={edit} style={{ flex: 2 }} testID="btn-edit" />
          <Button label="Padam" variant="danger" onPress={askDelete} style={{ flex: 1 }} testID="btn-delete" />
        </View>
      </SafeAreaView>

      <ConfirmDialog
        visible={confirm}
        title="Padam resepi?"
        message={`“${recipe.name}” akan dipadam secara kekal. Tindakan ini tidak boleh dibatalkan.`}
        onCancel={() => setConfirm(false)}
        onConfirm={doDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgApp },
  content: { padding: space.xl, gap: space.lg },
  photo: { width: '100%', height: 200, borderRadius: radius.lg, overflow: 'hidden' },
  stats: { flexDirection: 'row', gap: space.lg },
  ingredients: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: space.md, gap: space.xs },
  step: { flexDirection: 'row', gap: space.md, alignItems: 'flex-start' },
  stepNo: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.orange100, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingHorizontal: space.xl, paddingTop: space.md, paddingBottom: space.md, backgroundColor: colors.bgApp },
});
