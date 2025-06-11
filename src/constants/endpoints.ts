export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const ENDPOINTS = {
  POSTS: '/posts',
  POST: (id: number) => `/posts/${id}`,
};