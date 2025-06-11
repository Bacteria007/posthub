"use client";

import React from 'react';

const LoadingContainer: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50/20 to-gray-100/20">
      <div className="relative flex flex-col items-center space-y-8">
        
        {/* Main Spinner Container */}
        <div className="relative">
          
          {/* Outer Ring */}
          <div className="w-20 h-20 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-50 to-gray-100 scale-90"></div>
          </div>
          
          {/* Inner Ring */}
          <div className="absolute inset-2 w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-50 to-gray-100 scale-75"></div>
          </div>
          
          {/* Center Dot */}
          <div className="absolute inset-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse shadow-lg"></div>
          
          {/* Floating Particles */}
          <div className="absolute -inset-8">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Loading
          </h3>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse transform origin-left">
            <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-300/30 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-8 w-6 h-6 bg-pink-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-8 w-4 h-4 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-8 right-1/4 w-5 h-5 bg-cyan-300/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingContainer;