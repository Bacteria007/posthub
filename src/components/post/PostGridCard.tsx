"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import { useDeletePost } from '@/hooks/usePostApi';

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
  createdAt?: string;
  likes?: number;
  comments?: number;
}

interface PostGridCardProps {
  post: Post;
  index: number;
  isAdmin: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  deletePost: ReturnType<typeof useDeletePost>;
}

const PostGridCard: React.FC<PostGridCardProps> = ({ post, index, isAdmin, onEdit, onDelete, deletePost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Generate dynamic height based on content and index for masonry effect
  const baseHeight = 280;
  const contentLength = post.body.length;
  const dynamicHeight = baseHeight + (contentLength > 200 ? 80 : 0) + ((index % 4) * 60);
  
  // Generate random gradient backgrounds
  const gradients = [
    'from-blue-400 to-purple-500',
    'from-pink-400 to-red-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-orange-500',
    'from-purple-400 to-pink-500',
    'from-indigo-400 to-purple-500',
    'from-teal-400 to-blue-500',
    'from-orange-400 to-pink-500'
  ];
  
  const gradient = gradients[index % gradients.length];

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
      style={{ height: `${dynamicHeight}px` }}
    >
      {/* Gradient Header */}
      <div className={`h-20 bg-gradient-to-r ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute top-3 w-full px-4 flex items-center justify-between">
          {!isAdmin && (
            <>
              <h1 className="text-white font-semibold text-lg truncate">
                Post# {post.id}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
                onClick={() => onEdit(post.id)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full"
                onClick={() => onDelete(post.id)}
                disabled={deletePost.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        <Link href={`/posts/${post.id}`} className="flex-1">
          <h2 className="text-xl font-bold text-gray-900  mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {post.body}
          </p>
        </Link>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>User {post.userId || post.id}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>2d ago</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
            #{post.id}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              className={`flex items-center gap-1 text-sm transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{(post.likes || 0) + (isLiked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments || Math.floor(Math.random() * 20)}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <Link href={`/posts/${post.id}`}>
              <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default PostGridCard


