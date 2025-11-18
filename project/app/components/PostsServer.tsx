// Server Component do pobierania postów z API

import { getPosts } from '../lib/api';
import { transformPost, formatTimestamp } from '../lib/api-helpers';
import { Post } from '../types/api';

/**
 * Server Component pobierający posty z API
 * Zwraca dane w formacie używanym przez frontend
 */
export async function PostsServer(): Promise<Post[]> {
  try {
    const apiPosts = await getPosts();
    const transformedPosts = apiPosts.map(transformPost);
    
    // Formatuj timestampy do czytelnej formy
    return transformedPosts.map(post => ({
      ...post,
      author: {
        ...post.author,
        timestamp: formatTimestamp(post.author.timestamp),
      },
    }));
  } catch (error) {
    console.error('Błąd podczas pobierania postów w Server Component:', error);
    return [];
  }
}

