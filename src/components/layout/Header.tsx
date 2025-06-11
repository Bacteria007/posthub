"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Search, User, Bookmark, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderProps {
  filteredPosts: { id: number; title: string; body: string }[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isAdmin?: boolean;
  view?: 'grid' | 'list';
  setView?: (view: 'grid' | 'list') => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  view = 'grid',
  setView,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  PostHub
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Discover & Share</p>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-gray-100">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>

          
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 ">
              <Bookmark className="w-4 h-4" />
            </Button>

            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500  rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="items-center justify-between py-4 border-t border-gray-100 sm:flex hidden">
          <div className="flex items-center space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full transition-all"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={cn('rounded-full px-4 py-2 border-0 text-sm font-medium transition-all duration-300',
                  view === 'grid'
                    ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 '
                )}
                onClick={() => setView && setView('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" /> Grid
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                className={cn(' rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                  view === 'list'
                    ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
                onClick={() => setView && setView('list')}
              >
                <List className="w-4 h-4 mr-2" /> List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;