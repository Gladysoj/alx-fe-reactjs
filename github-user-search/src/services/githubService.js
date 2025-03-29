// githubService.js
import axios from 'axios';

// Create an Axios instance with default configuration
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    // Uncomment and add your token for higher rate limits
    // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
  },
  timeout: 10000, // 10 second timeout
});

export const searchGitHubUsers = async (params, page = 1) => {
  const { username, location, minRepos, language } = params;
  
  let query = username || '';
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;
  if (language) query += ` language:${language}`;

  const perPage = 30;

  try {
    const response = await githubApi.get('/search/users', {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    // Handle Axios-specific errors
    if (error.response) {
      // The request was made and the server responded with a status code
      throw new Error(`GitHub API error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from GitHub API');
    } else {
      // Something happened in setting up the request
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`GitHub API error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error('No response received from GitHub API');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

// Optional: Add request interceptor for additional configuration
githubApi.interceptors.request.use(
  (config) => {
    // You can modify the config here before the request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor
githubApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
