'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types';
import { getPosts } from '@/lib/api';
import Link from 'next/link';

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: initialPosts,
  });

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 relative">
        <input
          type="search"
          placeholder="Search articles by title..."
          className="w-full md:w-1/2 p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg className="absolute left-4 top-4 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {filteredPosts?.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts?.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden">
              {/* Thumbnail */}
              <div className="w-full h-48 overflow-hidden relative bg-gray-100">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex flex-col h-full">
                {/* Date */}
                <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow text-sm">
                  {post.body}
                </p>
                
                {/* Author Info & Link */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-8 h-8 rounded-full border border-gray-200" />
                    <span className="text-sm font-medium text-gray-700">{post.authorName}</span>
                  </div>
                  <Link href={`/posts/${post.id}`} className="text-blue-600 text-sm font-bold hover:text-blue-800">
                    Read →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}