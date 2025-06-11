"use client";

import React, { useState } from 'react';
import PostList from '@/components/post/PostList';
import Header from '@/components/layout/Header';
import { PostForm } from '@/components/post/PostForm';
import LoadingContainer from '@/components/LoadingContainer';
import { useFetchPosts } from '@/hooks/usePostApi';

const AdminDashboard: React.FC = () => {
  const [showAddPostDialog, setShowAddPostDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data: posts } = useFetchPosts();

  if (isLoading) return <LoadingContainer/>

  const filteredPosts = posts?.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header
        filteredPosts={filteredPosts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="container mx-auto px-4 py-8">
        <PostList isAdmin={true} posts={filteredPosts} />
      </main>
        <PostForm isOpen={showAddPostDialog} onClose={() => setShowAddPostDialog(false)} />
    </div>
  );
};

export default AdminDashboard;