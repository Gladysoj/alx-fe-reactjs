// Search.jsx
import React, { useState, useEffect } from 'react';
import { searchGitHubUsers, getUserDetails } from './githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: ''
  });
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);

    try {
      const response = await searchGitHubUsers(searchParams, 1);
      const detailedResults = await Promise.all(
        response.items.map(async (user) => {
          const details = await getUserDetails(user.login);
          return { ...user, ...details };
        })
      );
      setResults(detailedResults);
      setHasMore(response.total_count > response.items.length);
    } catch (error) {
      setError('Failed to fetch results. Please try again.');
    }
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    
    try {
      const response = await searchGitHubUsers(searchParams, nextPage);
      const detailedResults = await Promise.all(
        response.items.map(async (user) => {
          const details = await getUserDetails(user.login);
          return { ...user, ...details };
        })
      );
      setResults([...results, ...detailedResults]);
      setPage(nextPage);
      setHasMore(response.total_count > results.length + response.items.length);
    } catch (error) {
      setError('Failed to load more results.');
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={searchParams.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., johndoe"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={searchParams.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., San Francisco"
            />
          </div>
          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              name="minRepos"
              id="minRepos"
              min="0"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Language
            </label>
            <input
              type="text"
              name="language"
              id="language"
              value={searchParams.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., JavaScript"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Searching...' : 'Search Users'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.login}</h3>
                {user.name && <p className="text-gray-600">{user.name}</p>}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {user.location && (
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {user.location}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Repositories:</span> {user.public_repos}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Followers:</span> {user.followers}
              </p>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Full Profile →
            </a>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Load More Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
