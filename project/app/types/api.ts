// Typy odpowiadające modelom z FastAPI

export interface PostResponse {
  id: number;
  author_id: number;
  author: string;
  avatar: string | null;
  title: string;
  content: string;
  timestamp: string | null;
  image: string | null;
  likes: number;
  comments: number;
  saves: number;
  tags: string[];
}

export interface CourseResponse {
  id: number;
  title: string;
  educator: string;
  image: string | null;
  duration: string | null;
  students: string | null;
  rating: number | null;
  level: string | null;
  price: string | null;
  description: string | null;
}

// Typy używane przez frontend
export interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    image: string;
    timestamp: string;
  };
  content: {
    text: string;
    image?: string;
    tags: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    saves: number;
  };
}

export interface Course {
  id: string;
  title: string;
  educator: string;
  image: string;
  duration: string;
  students: string;
  rating: number;
  level: string;
  price: string;
  description?: string;
}

