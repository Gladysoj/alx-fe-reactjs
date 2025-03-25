// src/App.jsx
import { useState, useEffect } from 'react';
import { githubApi } from './services/api';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [testData, setTestData] = useState(null);

  // Test the API connection
  useEffect(() => {
    githubApi.get('/users/octocat')
      .then(response => {
        setTestData(response.data);
        console.log('API test successful:', response.data);
      })
      .catch(error => {
        console.error('API test failed:', error);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>GitHub User Search</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search GitHub users..."
        />
      </header>
      <main>
        {testData && (
          <p>Test API call successful: {testData.login}</p>
        )}
      </main>
    </div>
  );
}

export default App;
