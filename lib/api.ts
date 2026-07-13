import { Post } from '@/types';

// Your actual MockAPI link with the "posts" endpoint
const API_URL = 'https://6a552601e49d9eb2cc559260.mockapi.io/posts';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(API_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json(); // MockAPI returns the array directly
}

export async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}