// Search.jsx (Updated Search Component)
import React, { useState } from 'react';
import { searchGitHubUsers } from './githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
  });
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPage(1);
    
    try {
      const response = await searchGitHubUsers(searchParams, 1);
      setResults(response.items);
      setHasMore(response.total_count > response.items.length);
    } catch (error) {
      console.error('Search error:', error);
    }
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    
    try {
      const response = await searchGitHubUsers(searchParams, nextPage);
      setResults([...results, ...response.items]);
      setPage(nextPage);
      setHasMore(response.total_count > results.length + response.items.length);
    } catch (error) {
      console.error('Load more error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={searchParams.username}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={searchParams.location}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
              Minimum Repositories
            </label>
            <input
              type="number"
              name="minRepos"
              id="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter min repos"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.login}</h3>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Search;
