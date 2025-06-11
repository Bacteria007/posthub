"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PostList from '@/components/post/PostList';
import Header from '@/components/layout/Header';
import LoadingContainer from '@/components/LoadingContainer';
import { useFetchPosts } from '@/hooks/usePostApi';

const Posts: React.FC = () => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid'); // Default to grid view
  const { isLoading, data: posts } = useFetchPosts();

  if (isLoading) return <LoadingContainer />;

  // Compute filtered posts reactively
  const filteredPosts = posts?.filter(post =>
    post.title?.toLowerCase().includes(search.toLowerCase()) ||
    post.body?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  console.log('Filtered Posts:', filteredPosts); // Debug log to check filtering

  return (
    <>
      <Header
        filteredPosts={filteredPosts}
        searchTerm={search}
        setSearchTerm={setSearch}
        view={view}
        setView={setView}
        isAdmin={true}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <PostList
              isAdmin={false} // Changed to true to enable admin features
              view={view}
              posts={filteredPosts} // Pass filtered posts
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Posts;