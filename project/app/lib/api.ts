// Funkcje do pobierania danych z API

import { PostResponse, CourseResponse } from '../types/api';

// Używamy Next.js API routes jako proxy do FastAPI
const API_BASE_URL = '/api';

/**
 * Pobiera wszystkie posty z API
 */
export async function getPosts(): Promise<PostResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania postów:', error);
    return [];
  }
}

/**
 * Pobiera wszystkie kursy z API
 */
export async function getCourses(): Promise<CourseResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania kursów:', error);
    return [];
  }
}

/**
 * Tworzy nowy post przez API
 */
export async function createPost(postData: {
  title: string;
  content: string;
  author_id: number;
  author: string;
  avatar?: string;
  image?: string;
  tags?: string;
}): Promise<PostResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd podczas tworzenia posta:', error);
    throw error;
  }
}

