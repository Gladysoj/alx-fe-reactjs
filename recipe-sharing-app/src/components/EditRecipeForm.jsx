// src/components/EditRecipeForm.jsx
import { useState } from 'react';
import useRecipeStore from './recipeStore'; // Updated import
import { useNavigate } from 'react-router-dom';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe); // Updated select
  const [title, setTitle] = useState(recipe.title); // Updated state initialization
  const [description, setDescription] = useState(recipe.description); // Updated state initialization
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    updateRecipe({ ...recipe, title, description });
    navigate('/');
  }; // Updated action call

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        style={{ padding: '8px', fontSize: '16px', minHeight: '100px' }}
      />
      <button
        type="submit"
        style={{
          padding: '8px',
          fontSize: '16px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Update Recipe
      </button>
    </form>
  );
};

export default EditRecipeForm;
