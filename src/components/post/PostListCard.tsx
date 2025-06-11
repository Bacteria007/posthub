"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Clock,
    Tag
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface Post {
    id: number;
    title: string;
    body: string;
    userId?: number;
    createdAt?: string;
    likes?: number;
    comments?: number;
}

interface PostListCardProps {
    post: Post;
    index: number;
    isAdmin: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    deletePost: any;
}
const PostListCard: React.FC<PostListCardProps> = ({ post, isAdmin, onEdit, onDelete, deletePost }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const categories = ['Technology', 'Design', 'Business', 'Health', 'Travel', 'Food', 'Lifestyle'];
    const category = categories[post.id % categories.length];
    const readTime = Math.ceil(post.body.length / 200) || 3;
    const likes = post.likes || Math.floor(Math.random() * 100) + 10;
    const comments = post.comments || Math.floor(Math.random() * 50) + 5;

    return (
        <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-1">
            {/* Post Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 ring-2 ring-gray-100">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId || post.id}`} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                U{post.userId || post.id}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">
                                User {post.userId || post.id}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>2 days ago</span>
                                <span>•</span>
                                <span>{readTime} min read</span>
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => onEdit(post.id)}
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => onDelete(post.id)}
                                disabled={deletePost.isPending}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    {!isAdmin && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                {/* Category Badge */}
                <Badge
                    variant="secondary"
                    className="mb-3 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                >
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                </Badge>

                {/* Post Content */}
                <Link href={`/posts/${post.id}`} className="block">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {post.body}
                    </p>
                </Link>
            </div>

            {/* Post Footer */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    {/* Engagement Stats */}
                    <div className="flex items-center space-x-6">
                        <button
                            className={`flex items-center space-x-2 text-sm transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                }`}
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span className="font-medium">{likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <Link
                            href={`/posts/${post.id}#comments`}
                            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-500 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-medium">{comments}</span>
                        </Link>

                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            className={`p-2 rounded-full transition-colors ${isBookmarked
                                    ? 'text-yellow-600 bg-yellow-50'
                                    : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                                }`}
                            onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>

                        <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>

                        <Link href={`/posts/${post.id}`}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                            >
                                Read More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostListCard


