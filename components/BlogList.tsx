'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types';
import { getPosts } from '@/lib/api';
import Link from 'next/link';

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // React Query handles background updates and caching
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: initialPosts, 
  });

  // Client-side search filter
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar - Accessible & Responsive */}
      <div className="mb-8 relative">
        <label htmlFor="search" className="sr-only">Search articles</label>
        <input
          id="search"
          type="search"
          placeholder="Search articles by title..."
          className="w-full md:w-1/2 p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search articles"
        />
        <svg 
          className="absolute left-4 top-4 h-5 w-5 text-gray-400" 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Grid Layout - Pixel-Perfect UI */}
      {filteredPosts?.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No articles found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts?.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col h-full overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900 capitalize">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {post.body}
                </p>
                <Link 
                  href={`/posts/${post.id}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}