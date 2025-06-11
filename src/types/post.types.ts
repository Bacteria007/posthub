
// Define the Post interface with a fixed userId assumption
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number; // Fixed to a single user (e.g., 1)
}

// Define the data structure for creating a post
export interface CreatePostData {
  title: string;
  body: string;
  userId?: number; // Optional, will default to 1
}

// Define the data structure for updating a post
export interface UpdatePostData {
  title: string;
  body: string;
}