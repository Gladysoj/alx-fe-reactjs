import { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

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
        {/* Future components will go here */}
      </main>
    </div>
  );
}

export default App;
