// githubService.js (Updated GitHub API Integration)
export const searchGitHubUsers = async (params, page = 1) => {
  const { username, location, minRepos } = params;
  
  // Construct the query string
  let query = username || '';
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const perPage = 30;
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add GitHub token if available for higher rate limits
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
