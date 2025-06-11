"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useFetchPost } from '@/hooks/usePostApi';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Eye,
  Clock,
  Tag,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PostPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: post, isLoading } = useFetchPost(parseInt(id, 10));
  const router = useRouter();
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mock data for enhanced features
  const readTime = post ? Math.ceil(post.body.length / 200) || 3 : 0;
  const likes = 50;
  const comments = 10;
  const views = 200;
  const categories = ['Technology', 'Design', 'Business', 'Health', 'Travel', 'Food'];
  const category = categories[parseInt(id) % categories.length];

  // Scroll progress handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></div>
        </div>

        {/* Header Skeleton */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-10 w-20" />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-8">
            {/* Hero Section Skeleton */}
            <div className="text-center space-y-6">
              <div className="flex justify-center space-x-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <div className="flex items-center justify-center space-x-6">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50">
        <div className="text-center animate-fade-in max-w-md mx-auto px-4">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">!</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The post you&#39;re looking for doesn&#39;t exist or may have been removed.
          </p>
          <Button 
            onClick={() => router.back()}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:scale-105 transition-all duration-300 hover:shadow-md border-gray-200 hover:border-purple-300"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={`transition-all duration-300 ${isBookmarked ? 'text-yellow-600 bg-yellow-50' : 'hover:text-yellow-600 hover:bg-yellow-50'}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="animate-fade-in">
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-6">
            <div className="flex justify-center space-x-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                <Tag className="w-3 h-3 mr-1" />
                {category}
              </Badge>
              <Badge variant="outline" className="border-gray-300 hover:border-purple-300 transition-all duration-300">
                <Calendar className="w-3 h-3 mr-1" />
                Post #{post.id}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4 py-6">
              <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                <AvatarImage src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-lg">
                  U{post.userId}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-lg">User {post.userId}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                  </div>
                  <span>•</span>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 py-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Eye className="w-5 h-5" />
                <span className="font-medium">{views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{likes}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{comments}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <Card className="overflow-hidden shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed text-lg" style={{ lineHeight: '1.8' }}>
                  {post.body.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 first:text-xl first:font-medium first:text-gray-800">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Section */}
          <div className="mt-12 p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isLiked 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{likes + (isLiked ? 1 : 0)}</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{comments}</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-300">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium">Helpful</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-all duration-300 ${
                    isBookmarked 
                      ? 'text-yellow-600 bg-yellow-50' 
                      : 'hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={() => router.back()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600  hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </div>
        </article>
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-8 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-8 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default PostPage;