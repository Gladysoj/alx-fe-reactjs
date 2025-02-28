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
        style={{ padding: '10px', fontSize: '18px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        style={{ padding: '10px', fontSize: '18px', minHeight: '100px' }}
      />
      <button
        type="submit"
        style={{
          padding: '10px',
          fontSize: '18px',
          backgroundColor: '#441752',
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
