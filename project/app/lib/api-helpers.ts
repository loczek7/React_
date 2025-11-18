// Funkcje pomocnicze do transformacji danych z API do formatu frontendu

import { PostResponse, CourseResponse, Post, Course } from '../types/api';

/**
 * Transformuje PostResponse z API do formatu Post używanego przez frontend
 */
export function transformPost(apiPost: PostResponse): Post {
  return {
    id: apiPost.id.toString(),
    author: {
      name: apiPost.author,
      title: "Użytkownik", // TODO: Pobierz z UserModel gdy będzie dostępne w API
      image: apiPost.avatar || "",
      timestamp: apiPost.timestamp || new Date().toISOString(),
    },
    content: {
      text: apiPost.content,
      image: apiPost.image || undefined,
      tags: apiPost.tags || [],
    },
    engagement: {
      likes: apiPost.likes,
      comments: apiPost.comments,
      saves: apiPost.saves,
    },
  };
}

/**
 * Transformuje CourseResponse z API do formatu Course używanego przez frontend
 */
export function transformCourse(apiCourse: CourseResponse): Course {
  return {
    id: apiCourse.id.toString(),
    title: apiCourse.title,
    educator: apiCourse.educator,
    image: apiCourse.image || "",
    duration: apiCourse.duration || "N/A",
    students: apiCourse.students || "0",
    rating: apiCourse.rating || 0,
    level: apiCourse.level || "Beginner",
    price: apiCourse.price || "$0",
    description: apiCourse.description,
  };
}

/**
 * Formatuje timestamp do czytelnej formy (np. "2h ago", "1d ago")
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('pl-PL');
}

