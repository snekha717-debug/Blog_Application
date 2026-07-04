import { getPostById } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. Update Props: params is now a Promise
type Props = {
  params: Promise<{ id: string }>;
};

// 2. Await the params before using them in generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; 
  const post = await getPostById(resolvedParams.id);
  
  return {
    title: `${post.title} | BlogSpace`,
    description: post.body.substring(0, 150) + '...',
  };
}

// 3. Await the params before using them in your Page component
export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.id);

  return (
    <article className="max-w-2xl mx-auto py-10">
      <Link 
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to articles
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 capitalize leading-tight">
        {post.title}
      </h1>
      
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-200">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
          {post.userId}
        </div>
        <div>
          <p className="font-medium text-gray-900">Author ID: {post.userId}</p>
          <p className="text-sm text-gray-500">Published just now</p>
        </div>
      </div>

      <div className="prose prose-lg prose-blue text-gray-700">
        <p className="whitespace-pre-line text-lg leading-relaxed">
          {post.body}
        </p>
      </div>
    </article>
  );
}