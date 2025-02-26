// src/components/DeleteRecipeButton.jsx
import useRecipeStore from './recipeStore'; // Updated import
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '8px',
        fontSize: '16px',
        backgroundColor: '#F44336',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
