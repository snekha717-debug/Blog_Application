import { getPosts } from '@/lib/api';
import BlogList from '@/components/BlogList';

export default async function Home() {
  // SSR: Fetching data on the server
  const initialPosts = await getPosts();

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight mb-2">Latest Articles</h2>
        <p className="text-gray-600">Discover our newest insights and stories.</p>
      </div>
      
      {/* Pass SSR data to Client Component for interactivity */}
      <BlogList initialPosts={initialPosts} />
    </section>
  );
}