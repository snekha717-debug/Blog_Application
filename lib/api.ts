import { Post } from '@/types';

const API_URL = 'https://dummyjson.com/posts';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(API_URL, { cache: 'no-store' }); // Ensures SSR
  if (!res.ok) throw new Error('Failed to fetch posts');
  
  const data = await res.json();
  // DummyJSON returns an object like { posts: [...] }, so we return data.posts
  return data.posts;
}

export async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}