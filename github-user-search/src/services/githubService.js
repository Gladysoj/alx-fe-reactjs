import { githubApi } from './api';

export async function fetchUsers({ username, location, minRepos }, page = 1) {
  // Construct the query string
  let query = username || '';
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  if (!query.trim()) {
    throw new Error('At least one search criterion is required');
  }

  try {
    const response = await githubApi.get('/search/users', {
      params: {
        q: query,
        page,
        per_page: 10, // Limit results per page
      },
    });
    return response.data; // Returns { items: [], total_count, ... }
  } catch (error) {
    throw new Error('Search failed');
  }
}
