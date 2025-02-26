import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  // Select favorites and recipes separately to avoid unnecessary re-renders
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);

  // Compute the favorite recipes outside of the Zustand selector
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean); // Remove undefined values

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
          >
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "#333" }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{recipe.title}</h3>
              <p style={{ margin: "0" }}>{recipe.description}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
