// Search.jsx
import React, { useState } from 'react';
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

  const fetchUserData = async (pageNum = 1, append = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch initial search results
      const searchResponse = await searchGitHubUsers(searchParams, pageNum);
      
      // Fetch detailed user data for each result
      const detailedResults = await Promise.all(
        searchResponse.items.map(async (user) => {
          try {
            const userDetails = await getUserDetails(user.login);
            return { ...user, ...userDetails };
          } catch (detailError) {
            console.error(`Error fetching details for ${user.login}:`, detailError);
            return user; // Return basic user data if detailed fetch fails
          }
        })
      );

      // Update state based on whether we're appending or replacing results
      setResults(append ? [...results, ...detailedResults] : detailedResults);
      setHasMore(searchResponse.total_count > (append ? results.length + detailedResults.length : detailedResults.length));
      setPage(pageNum);
    } catch (error) {
      setError(`Failed to fetch results: ${error.message}. Please try again.`);
      setResults([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchUserData(1, false);
  };

  const loadMore = async () => {
    await fetchUserData(page + 1, true);
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
      {results.length > 0 ? (
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
                  <span className="font-medium">Repositories:</span> {user.public_repos || 'N/A'}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Followers:</span> {user.followers || 'N/A'}
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
      ) : (
        !isLoading && !error && (
          <div className="text-center text-gray-600 mt-8">
            No results yet. Enter search criteria above to find GitHub users.
          </div>
        )
      )}

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
