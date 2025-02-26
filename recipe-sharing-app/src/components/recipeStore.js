import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],
      searchTerm: '',
      filteredRecipes: [],
      favorites: [],
      recommendations: [],

      // Add a new recipe and update filteredRecipes
      addRecipe: (newRecipe) =>
        set((state) => {
          console.log('Adding recipe:', newRecipe);
          const updatedRecipes = [...state.recipes, newRecipe];
          return {
            recipes: updatedRecipes,
            filteredRecipes: updatedRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            ),
          };
        }),

      // Delete a recipe, update favorites and recommendations
      deleteRecipe: (id) =>
        set((state) => {
          console.log('Deleting recipe ID:', id);
          const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
          const updatedFavorites = state.favorites.filter((favId) => favId !== id);
          return {
            recipes: updatedRecipes,
            filteredRecipes: updatedRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            ),
            favorites: updatedFavorites,
            recommendations: updatedRecipes.filter((recipe) =>
              updatedFavorites.includes(recipe.id) && Math.random() > 0.5
            ),
          };
        }),

      // Update an existing recipe
      updateRecipe: (updatedRecipe) =>
        set((state) => {
          console.log('Updating recipe:', updatedRecipe);
          const updatedRecipes = state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          );
          return {
            recipes: updatedRecipes,
            filteredRecipes: updatedRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            ),
          };
        }),

      // Set the entire recipes array (e.g., for initialization)
      setRecipes: (recipes) =>
        set((state) => {
          console.log('Setting recipes:', recipes);
          return {
            recipes,
            filteredRecipes: recipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            ),
          };
        }),

      // Update search term and filter recipes
      setSearchTerm: (term) =>
        set((state) => {
          console.log('Setting search term:', term);
          return {
            searchTerm: term,
            filteredRecipes: state.recipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(term.toLowerCase())
            ),
          };
        }),

      // Add a recipe to favorites and update recommendations
      addFavorite: (recipeId) =>
        set((state) => {
          if (state.favorites.includes(recipeId)) return state;
          console.log('Adding favorite:', recipeId);
          const updatedFavorites = [...state.favorites, recipeId];
          return {
            favorites: updatedFavorites,
            recommendations: state.recipes.filter((recipe) =>
              updatedFavorites.includes(recipe.id) && Math.random() > 0.5
            ),
          };
        }),

      // Remove a recipe from favorites and update recommendations
      removeFavorite: (recipeId) =>
        set((state) => {
          console.log('Removing favorite:', recipeId);
          const updatedFavorites = state.favorites.filter((id) => id !== recipeId);
          return {
            favorites: updatedFavorites,
            recommendations: state.recipes.filter((recipe) =>
              updatedFavorites.includes(recipe.id) && Math.random() > 0.5
            ),
          };
        }),

      // Generate recommendations based on favorites
      generateRecommendations: () =>
        set((state) => {
          console.log('Generating recommendations');
          return {
            recommendations: state.recipes.filter((recipe) =>
              state.favorites.includes(recipe.id) && Math.random() > 0.5
            ),
          };
        }),
    }),
    {
      name: 'recipe-storage', // Persist state in localStorage
    }
  )
);

export default useRecipeStore;
