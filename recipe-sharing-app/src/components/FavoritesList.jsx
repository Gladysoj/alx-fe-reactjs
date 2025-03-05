// FavoritesList.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const { favorites, recipes, removeFavorite } = useRecipeStore((state) => ({
    favorites: state.favorites,
    recipes: state.recipes,
    removeFavorite: state.removeFavorite,
  }));

  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // Filter out undefined in case a recipe is missing

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet. Start adding some recipes!</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions.substring(0, 100)}...</p>
            <button
              onClick={() => removeFavorite(recipe.id)}
              className="remove-btn"
            >
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};