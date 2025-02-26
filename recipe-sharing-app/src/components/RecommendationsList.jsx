import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Add some favorites!</p>
      ) : (
        recommendations.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
            }}
          >
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: '#333' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{recipe.title}</h3>
              <p style={{ margin: '0' }}>{recipe.description}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;
