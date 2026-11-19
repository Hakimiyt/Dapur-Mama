import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from '../utils/log';
import sampleRecipes from '../data/sampleRecipes';

// Penyimpanan setempat (local data storage) menggunakan AsyncStorage
const KEY = '@dapur_mama/recipes_v1';
const SAMPLE_VERSION_KEY = '@dapur_mama/sample_recipes_version';
const SAMPLE_VERSION = '4';

export async function loadRecipes() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw === null) {
      await AsyncStorage.setItem(KEY, JSON.stringify(sampleRecipes));
      await AsyncStorage.setItem(SAMPLE_VERSION_KEY, SAMPLE_VERSION);
      log('loadRecipes -> data contoh', sampleRecipes.length, 'rekod');
      return sampleRecipes;
    }
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('Data resepi tidak sah.');

    const sampleVersion = await AsyncStorage.getItem(SAMPLE_VERSION_KEY);
    if (sampleVersion !== SAMPLE_VERSION) {
      const sampleById = new Map(sampleRecipes.map((recipe) => [recipe.id, recipe]));
      const existingIds = new Set(data.map((recipe) => recipe.id));
      const migrated = data.map((recipe) => {
        const sample = sampleById.get(recipe.id);
        return sample
          ? {
              ...recipe,
              name: sample.name,
              category: sample.category,
              minutes: sample.minutes,
              ingredients: sample.ingredients,
              steps: sample.steps,
              recommended: sample.recommended,
            }
          : recipe;
      });
      migrated.push(...sampleRecipes.filter((recipe) => !existingIds.has(recipe.id)));
      await AsyncStorage.setItem(KEY, JSON.stringify(migrated));
      await AsyncStorage.setItem(SAMPLE_VERSION_KEY, SAMPLE_VERSION);
      log('loadRecipes -> data contoh dikemas kini', migrated.length, 'rekod');
      return migrated;
    }

    log('loadRecipes ->', data.length, 'rekod');
    return data;
  } catch (e) {
    log('loadRecipes GAGAL', e);
    throw e;
  }
}

export async function saveRecipes(recipes) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(recipes));
    log('saveRecipes <-', recipes.length, 'rekod');
    return true;
  } catch (e) {
    log('saveRecipes GAGAL', e);
    throw e;
  }
}
