"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PostForm } from './PostForm';
import {
  Plus,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import PostGridCard from '../PostGridCard';
import PostListCard from './PostListCard';
import AdminPostTable from './AdminPostTable';
import {
  useDeletePost,
  useFetchPost,
  useFetchPosts,
  useUpdatePost,
  useCreatePost
} from '@/hooks/usePostApi';

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
  createdAt?: string;
  likes?: number;
  comments?: number;
}

interface PostListProps {
  isAdmin?: boolean;
  view?: 'grid' | 'list';
  posts?: Post[];
}

export default function PostList({ isAdmin = false, view = 'grid', posts: propPosts = [] }: PostListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // React Query hooks
  const { data: fetchedPosts = [], isLoading, error } = useFetchPosts();
  const { data: editPost } = useFetchPost(editPostId || -1);
  const deletePostMutation = useDeletePost();
  const updatePostMutation = useUpdatePost();
  const createPostMutation = useCreatePost();

  // Use fetched posts initially, then manage locally
  const [localPosts, setLocalPosts] = useState<Post[]>(propPosts.length > 0 ? propPosts : fetchedPosts);

  useEffect(() => {
    if (propPosts.length > 0) {
      setLocalPosts(propPosts);
    } else if (fetchedPosts.length > 0 && !isLoading) {
      setLocalPosts(fetchedPosts);
    }
  }, [propPosts, fetchedPosts, isLoading]);

  useEffect(() => {
    if (editPostId !== null && editPost) {
      setEditPostId(editPostId);
    }
  }, [editPostId, editPost]);

  const handleEdit = (id: number) => {
    setEditPostId(id);
  };

  const handleDelete = (id: number) => {
    deletePostMutation.mutate(id, {
      onSuccess: () => {
        setLocalPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
        if (editPostId === id) setEditPostId(null);
        const totalPosts = localPosts.length - 1;
        const lastPage = Math.ceil(totalPosts / postsPerPage);
        if (currentPage > lastPage) setCurrentPage(lastPage || 1);
      },
      onError: (error) => {
        console.error('Delete failed:', error);
      },
    });
  };

 

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to load posts</h3>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = localPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(localPosts.length / postsPerPage);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {isAdmin ? 'Manage Posts' : 'Discover Stories'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isAdmin ? 'Create, edit, and manage all posts' : 'Explore amazing content from our community'}
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => setIsCreateOpen(true)}
              disabled={createPostMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <Plus className="size-4 mr-2" />
              {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          )}
        </div>

        {!isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{localPosts.length || 0}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Writers</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render based on view */}
        {isAdmin ? (
          <>
            <AdminPostTable
              posts={currentPosts}
              editPostId={editPostId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletePost={deletePostMutation}
              isDeleting={deletePostMutation.isPending}
            />
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white' : ''}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : view === 'grid' ? (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6">
              {currentPosts.map((post, index) => (
                <div key={post.id} className="break-inside-avoid mb-6">
                  <PostGridCard
                    post={post}
                    index={index}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    deletePost={deletePostMutation}
                    // isDeleting={deletePostMutation.isPending}
                  />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white' : ''}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="space-y-4">
              {currentPosts.map((post, index) => (
                <PostListCard
                  key={post.id}
                  deletePost={deletePostMutation}
                  index={index}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  post={post}
                  // isDeleting={deletePostMutation.isPending}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white' : ''}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {localPosts.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No posts yet</h3>
              <p className="text-gray-600 mb-6">
                {isAdmin
                  ? "Get started by creating your first post to share with the community"
                  : "Check back later for amazing content from our writers"
                }
              </p>
              {isAdmin && (
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  disabled={createPostMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  <Plus className="size-4 mr-2" />
                  {createPostMutation.isPending ? 'Creating...' : 'Create First Post'}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Loading States for Mutations */}
        {(createPostMutation.isPending || updatePostMutation.isPending || deletePostMutation.isPending) && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>
                {createPostMutation.isPending && 'Creating post...'}
                {updatePostMutation.isPending && 'Updating post...'}
                {deletePostMutation.isPending && 'Deleting post...'}
              </span>
            </div>
          </div>
        )}

        {/* Modals */}
        {isAdmin && (
          <>
            <PostForm
              isOpen={isCreateOpen}
              onClose={() => setIsCreateOpen(false)}
              onSubmitSuccess={(newPost) => {
                setLocalPosts((prevPosts) => {
                  const updatedPosts = [...prevPosts];
                  updatedPosts.splice(1, 0, newPost); // Insert at index 1
                  return updatedPosts;
                });
              }}
            />

            {editPostId !== null && editPost && (
              <PostForm
                post={editPost}
                isOpen={!!editPostId}
                onClose={() => setEditPostId(null)}
                onSubmitSuccess={(updatedPost) => {
                  setLocalPosts((prevPosts) =>
                    prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
                  );
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}