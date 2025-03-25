import { githubApi } from './api';

export async function fetchUserData(username) {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
}
