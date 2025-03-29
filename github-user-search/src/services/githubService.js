// githubService.js
export const searchGitHubUsers = async (params, page = 1) => {
  const { username, location, minRepos, language } = params;
  
  let query = username || '';
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;
  if (language) query += ` language:${language}`;

  const perPage = 30;
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Optional: Add GitHub Personal Access Token for higher rate limits
        // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
