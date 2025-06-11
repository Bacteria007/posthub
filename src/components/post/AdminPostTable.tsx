"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';
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

interface AdminPostTableProps {
  posts: Post[];
  editPostId: number | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  deletePost: ReturnType<typeof useDeletePost>;
  isDeleting:boolean
}

const AdminPostTable: React.FC<AdminPostTableProps> = ({ posts, editPostId, onEdit, onDelete, deletePost }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
      <Table>
        <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <TableRow>
            <TableHead className="text-left font-semibold text-gray-800">ID</TableHead>
            <TableHead className="text-left font-semibold text-gray-800">Title</TableHead>
            <TableHead className="text-left font-semibold text-gray-800">Body Preview</TableHead>
            <TableHead className="text-left font-semibold text-gray-800">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
              <TableCell className="font-medium text-gray-800">{post.id}</TableCell>
              <TableCell className="max-w-xs">
                <div className="truncate text-blue-600 hover:underline font-medium">{post.title}</div>
              </TableCell>
              <TableCell className="max-w-md">
                <div className="truncate text-gray-600">{post.body.slice(0, 100)}...</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Link href={`/posts/${post.id}`}>
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-500 hover:text-green-700 hover:bg-green-50"
                    onClick={() => onEdit(post.id)}
                    disabled={editPostId === post.id}
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(post.id)}
                    disabled={deletePost.isPending || editPostId === post.id}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPostTable;