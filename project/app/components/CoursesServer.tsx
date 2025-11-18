// Server Component do pobierania kursów z API

import { getCourses } from '../lib/api';
import { transformCourse } from '../lib/api-helpers';
import { Course } from '../types/api';

/**
 * Server Component pobierający kursy z API
 * Zwraca dane w formacie używanym przez frontend
 */
export async function CoursesServer(): Promise<Course[]> {
  try {
    const apiCourses = await getCourses();
    return apiCourses.map(transformCourse);
  } catch (error) {
    console.error('Błąd podczas pobierania kursów w Server Component:', error);
    return [];
  }
}

