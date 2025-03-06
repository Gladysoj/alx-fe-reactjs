import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Explicit imports
import Home from './components/Home';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    // BrowserRouter component wrapping the entire app
    <BrowserRouter>
      <div className="App">
        <Navbar 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        {/* Routes component containing all Route definitions */}
        <Routes>
          {/* Individual Route components */}
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
