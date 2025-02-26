import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
            Recipe Sharing App
          </Link>
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
