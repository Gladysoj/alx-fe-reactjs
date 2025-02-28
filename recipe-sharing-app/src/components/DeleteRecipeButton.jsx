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
        padding: '10px',
        fontSize: '18px',
        backgroundColor: '#003C43',
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
