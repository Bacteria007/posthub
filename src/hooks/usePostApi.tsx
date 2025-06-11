import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi, } from '@/lib/api';
import { CreatePostData, UpdatePostData } from '@/types/post.types';

// Query Keys
export const POST_QUERY_KEYS = {
    posts: ['posts'] as const,
    post: (id: number) => ['posts', id] as const,
};

// Fetch all posts
export const useFetchPosts = () => {
    return useQuery({
        queryKey: POST_QUERY_KEYS.posts,
        queryFn: postsApi.getPosts,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Fetch single post
export const useFetchPost = (id: number) => {
    return useQuery({
        queryKey: POST_QUERY_KEYS.post(id),
        queryFn: () => postsApi.getPost(id),
        enabled: id > 0, // Only run query if id is valid
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Create post mutation
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePostData) => postsApi.createPost(data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.posts });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        },
    });
};

// Update post mutation
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
            postsApi.updatePost(id, data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.posts });
        },
        onError: (error) => {
            console.error('Failed to update post:', error);
        },
    });
};

// Delete post mutation
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => postsApi.deletePost(id),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.posts });
        },
        onError: (error) => {
            console.error('Failed to delete post:', error);
        },



    });
};
