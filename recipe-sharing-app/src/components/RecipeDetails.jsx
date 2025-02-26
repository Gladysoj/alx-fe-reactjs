import { useParams } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Get recipeId from URL
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === Number(recipeId)) // Find recipe by id
  ); // Find recipe by id

  if (!recipe) {
    return <div>Recipe not found</div>;
  } // Display message if recipe not found

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '10px' }}>{recipe.title}</h1>
      <p style={{ marginBottom: '20px' }}>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  ); // Display recipe details, edit form, and delete button
};

export default RecipeDetails;
