import { Routes, Route, NavLink, Outlet } from 'react-router-dom';

const ProfileDetails = () => (
  <div>
    <h3>Profile Details</h3>
    <p>User details go here</p>
  </div>
);

const ProfileSettings = () => (
  <div>
    <h3>Profile Settings</h3>
    <p>Settings form goes here</p>
  </div>
);

const Profile = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Profile Page</h1>
      <nav style={{ margin: '1rem 0' }}>
        <NavLink 
          to="details" 
          style={({ isActive }) => ({ 
            marginRight: '1rem',
            color: isActive ? 'blue' : 'black'
          })}
        >
          Details
        </NavLink>
        <NavLink 
          to="settings"
          style={({ isActive }) => ({ 
            color: isActive ? 'blue' : 'black'
          })}
        >
          Settings
        </NavLink>
      </nav>
      
      {/* Nested Routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route index element={<ProfileDetails />} /> {/* Default route */}
      </Routes>
      <Outlet /> {/* For nested route rendering */}
    </div>
  );
};

export default Profile;
