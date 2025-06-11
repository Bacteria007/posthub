"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import RichTextEditor from '@/components/RichTextEditor';
import { useCreatePost, useUpdatePost } from '@/hooks/usePostApi';
import { CreatePostData, Post, UpdatePostData } from '@/types/post.types';

// Function to strip HTML tags
const stripHtml = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

interface PostFormProps {
  post?: Post;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (post: Post) => void; // Callback to update parent state
}

export const PostForm: React.FC<PostFormProps> = ({ post, isOpen, onClose, onSubmitSuccess }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  // Reset form fields when post changes (e.g., switching between edit posts)
  useEffect(() => {
    setTitle(post?.title || '');
    setBody(post?.body || '');
    setErrors({});
  }, [post]);

  const handleClose = () => {
    setTitle('');
    setBody('');
    setErrors({});
    onClose();
  };

  const validateForm = () => {
    const newErrors: { title?: string; body?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!body.trim()) {
      newErrors.body = 'Content is required';
    } else if (body.length > 5000) {
      newErrors.body = 'Content must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const plainBody = stripHtml(body); // Convert HTML to plain text
    const variables = { title: title.trim(), body: plainBody };

    if (post) {
      updatePostMutation.mutate(
        { id: post.id, data: variables as UpdatePostData },
        {
          onSuccess: (updatedPost) => {
            if (onSubmitSuccess) {
              onSubmitSuccess(updatedPost);
            }
            handleClose();
          },
          onError: (error) => {
            console.error('Error updating post:', error);
            setErrors({ body: 'Failed to update post. Please try again.' });
          },
        }
      );
    } else {
      createPostMutation.mutate(
        variables as CreatePostData,
        {
          onSuccess: (newPost) => {
            if (onSubmitSuccess) {
              onSubmitSuccess(newPost);
            }
            handleClose();
          },
          onError: (error) => {
            console.error('Error creating post:', error);
            setErrors({ body: 'Failed to create post. Please try again.' });
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
          <DialogClose onClick={handleClose} />
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium">
              Content
            </label>
            <RichTextEditor
              content={body}
              onChange={setBody}
              placeholder="Write your post content here..."
            />
            {errors.body && (
              <p className="text-sm text-destructive">{errors.body}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={post ? updatePostMutation.isPending : createPostMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={post ? updatePostMutation.isPending : createPostMutation.isPending}
            >
              {(post ? updatePostMutation.isPending : createPostMutation.isPending) ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};