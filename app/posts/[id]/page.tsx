import { getPostById } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.id);
  return {
    title: `${post.title} | BlogSpace`,
    description: post.body.substring(0, 150) + '...',
  };
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.id);

  // Format the date nicely
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <article className="max-w-3xl mx-auto py-8">
      <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors font-medium">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to articles
      </Link>
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
        {post.title}
      </h1>
      
      {/* Author and Date Row */}
      <div className="flex items-center gap-4 mb-8">
        <img 
          src={post.authorAvatar} 
          alt={post.authorName} 
          className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover" 
        />
        <div>
          <p className="font-bold text-gray-900 text-lg">{post.authorName}</p>
          <p className="text-sm text-gray-500">Published on {formattedDate}</p>
        </div>
      </div>

      {/* Hero Image / Thumbnail */}
      <div className="w-full h-64 md:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-lg bg-gray-100">
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg prose-blue text-gray-800 max-w-none">
        <p className="whitespace-pre-line text-lg leading-loose">
          {post.body}
        </p>
      </div>
    </article>
  );
}