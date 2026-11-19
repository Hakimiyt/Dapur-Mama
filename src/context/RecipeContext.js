import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loadRecipes, saveRecipes } from '../storage/recipeStorage';
import { log } from '../utils/log';

const RecipeContext = createContext(null);
export const useRecipes = () => useContext(RecipeContext);

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchRecipes = useCallback(
    () =>
      loadRecipes()
        .then((data) => {
          setRecipes(data);
          setLoadError(false);
        })
        .catch((error) => {
          log('Muat resepi GAGAL', error);
          setLoadError(true);
        })
        .finally(() => setLoading(false)),
    []
  );

  const reloadRecipes = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const commit = useCallback(async (next) => {
    await saveRecipes(next);
    setRecipes(next);
  }, []);

  // CREATE
  const addRecipe = useCallback(
    async (data) => {
      const recipe = { ...data, id: String(Date.now()), favorite: false, createdAt: Date.now() };
      log('CREATE', recipe.name);
      await commit([recipe, ...recipes]);
      return recipe;
    },
    [recipes, commit]
  );

  // UPDATE
  const updateRecipe = useCallback(
    async (id, data) => {
      log('UPDATE', id);
      await commit(recipes.map((r) => (r.id === id ? { ...r, ...data } : r)));
    },
    [recipes, commit]
  );

  // DELETE
  const deleteRecipe = useCallback(
    async (id) => {
      log('DELETE', id);
      await commit(recipes.filter((r) => r.id !== id));
    },
    [recipes, commit]
  );

  const toggleFavorite = useCallback(
    async (id) => commit(recipes.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))),
    [recipes, commit]
  );

  const getRecipe = useCallback((id) => recipes.find((r) => r.id === id), [recipes]);

  return (
    <RecipeContext.Provider
      value={{ recipes, loading, loadError, reloadRecipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite, getRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
