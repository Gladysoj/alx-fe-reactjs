import { useState } from 'react';
import { fetchUsers } from '../services/githubService';

function Search() {
  const [query, setQuery] = useState({ username: '', location: '', minRepos: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    setPage(1);

    try {
      const data = await fetchUsers(query, 1);
      setResults(data.items);
    } catch (err) {
      setError('No users found matching your criteria');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchUsers(query, nextPage);
      setResults((prev) => [...prev, ...data.items]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={query.username}
            onChange={handleInputChange}
            placeholder="e.g., octocat"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={query.location}
            onChange={handleInputChange}
            placeholder="e.g., San Francisco"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
            Minimum Repositories
          </label>
          <input
            type="number"
            id="minRepos"
            name="minRepos"
            value={query.minRepos}
            onChange={handleInputChange}
            placeholder="e.g., 10"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((user) => (
            <div key={user.id} className="p-4 border rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold">{user.login}</h3>
                  <p>Location: {user.location || 'Not specified'}</p>
                  <p>Repositories: {user.public_repos || 'N/A'}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={loadMore}
            disabled={loading}
            className="mt-4 w-full bg-gray-200 p-2 rounded-md hover:bg-gray-300 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
