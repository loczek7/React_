import { NextResponse } from 'next/server';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_URL}/api/posts`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Konwertuj JSON na FormData, ponieważ FastAPI oczekuje Form data
    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('content', body.content);
    formData.append('author_id', body.author_id.toString());
    formData.append('author', body.author);
    if (body.avatar) formData.append('avatar', body.avatar);
    if (body.image) formData.append('image', body.image);
    if (body.tags) formData.append('tags', Array.isArray(body.tags) ? body.tags.join(',') : body.tags);
    
    const response = await fetch(`${FASTAPI_URL}/api/posts`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

