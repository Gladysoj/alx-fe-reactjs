// RecommendationsList.jsx
import { Link } from 'react-router-dom';
import create from 'zustand';
import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, addFavorite } =
    useRecipeStore((state) => ({
      recommendations: state.recommendations,
      generateRecommendations: state.generateRecommendations,
      addFavorite: state.addFavorite,
    }));

  // Generate recommendations on mount
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div className="recommendations-list">
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Add some favorites to get started!</p>
      ) : (
        recommendations.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions.substring(0, 100)}...</p>
            <button
              onClick={() => addFavorite(recipe.id)}
              className="add-btn"
            >
              Add to Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export { FavoritesList, RecommendationsList };
