import { CreatePostData, Post, UpdatePostData } from '@/types/post.types';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';


// API Functions that return AxiosResponse
export const fetchPosts = async (): Promise<AxiosResponse<Post[]>> => {
  const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
  const filteredPosts = response.data.map(post => ({ ...post, userId: 1 }));
  return { ...response, data: filteredPosts } as AxiosResponse<Post[]>;
};

export const fetchPost = async (id: number): Promise<AxiosResponse<Post>> => {
  const response = await axios.get<Post>(`${API_BASE_URL}/posts/${id}`);
  return { ...response, data: { ...response.data, userId: 1 } } as AxiosResponse<Post>;
};

// Mock CRUD operations since JSONPlaceholder is read-only
export const createPost = async (data: CreatePostData): Promise<AxiosResponse<Post>> => {
  const response = await axios.post<Post>(`${API_BASE_URL}/posts`, { ...data, userId: 1 });
  // Simulate a new post with a high ID (e.g., 101+ since JSONPlaceholder has 100 posts)
  const newPost: Post = {
    id: Date.now(), // Use timestamp as a unique ID
    title: data.title,
    body: data.body,
    userId: 1,
  };
  return { ...response, data: newPost } as AxiosResponse<Post>;
};

export const updatePost = async (id: number, data: UpdatePostData): Promise<AxiosResponse<Post>> => {
  const response = await axios.put<Post>(`${API_BASE_URL}/posts/${id}`, { ...data, userId: 1, id });
  // Simulate update by returning the modified post
  const updatedPost: Post = {
    id,
    title: data.title,
    body: data.body,
    userId: 1,
  };
  return { ...response, data: updatedPost } as AxiosResponse<Post>;
};

export const deletePost = async (id: number): Promise<AxiosResponse<void>> => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
  // Simulate deletion by returning void (handled by React Query)
  return response;
};

// Convenience functions for React Query
export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetchPosts();
    return response.data;
  },
  getPost: async (id: number): Promise<Post> => {
    const response = await fetchPost(id);
    return response.data;
  },
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await createPost(data);
    return response.data;
  },
  updatePost: async (id: number, data: UpdatePostData): Promise<Post> => {
    const response = await updatePost(id, data);
    return response.data;
  },
  deletePost: async (id: number): Promise<void> => {
    await deletePost(id);
  },
};