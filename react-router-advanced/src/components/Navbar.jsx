import { NavLink } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <NavLink to="/" style={{ marginRight: '1rem' }}>Home</NavLink>
      <NavLink to="/profile" style={{ marginRight: '1rem' }}>Profile</NavLink>
      <NavLink to="/blog/1" style={{ marginRight: '1rem' }}>Blog Post 1</NavLink>
      <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

export default Navbar;
