import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(import.meta.env.VITE_GITHUB_API_KEY && {
      'Authorization': `token ${import.meta.env.VITE_GITHUB_API_KEY}`
    })
  }
});