from fastapi import FastAPI, HTTPException, Depends,UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uvicorn
import os
import uuid
import mimetypes
from database import get_db, init_db
from database import UserModel, PostModel, CommentModel, PublicationModel, ExperimentModel, UserAuthModel, PostFileModel, CourseModel
from auth import get_current_user, create_access_token, create_refresh_token, veryfy_token
from auth_utils import hash_password, verify_password
from config import ALLOWED_ORIGINS, load_dev_users, ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE, UPLOAD_DIR
from datetime import datetime

init_db()

app = FastAPI(title="SinceNet", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PostResponse(BaseModel):
    id: int
    author_id: int
    author: str
    avatar: Optional[str]
    title: str
    content: str
    timestamp: Optional[str]
    image: Optional[str]
    likes: int
    comments: int = 0
    saves: int = 0
    tags: List[str] = []

    class Config:
        from_attributes = True

class CourseResponse(BaseModel):
    id: int
    title: str
    educator: str
    image: Optional[str]
    duration: Optional[str]
    students: Optional[str]
    rating: Optional[float]
    level: Optional[str]
    price: Optional[str]
    description: Optional[str]

    class Config:
        from_attributes = True

# Endpoints
@app.get("/api/posts", response_model=List[PostResponse])
def get_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Pobierz wszystkie posty"""
    posts = db.query(PostModel).offset(skip).limit(limit).all()
    result = []
    for post in posts:
        # Pobierz liczbę komentarzy
        comment_count = db.query(CommentModel).filter(CommentModel.post_id == post.id).count()
        result.append(PostResponse(
            id=post.id,
            author_id=post.author_id,
            author=post.author,
            avatar=post.avatar,
            title=post.title,
            content=post.content,
            timestamp=post.timestamp,
            image=post.image,
            likes=post.likes,
            comments=comment_count,
            saves=0,  # TODO: Dodać model dla saves
            tags=[]  # TODO: Dodać model dla tags
        ))
    return result

@app.get("/api/courses", response_model=List[CourseResponse])
def get_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Pobierz wszystkie kursy"""
    courses = db.query(CourseModel).offset(skip).limit(limit).all()
    return courses

@app.post("/api/posts", response_model=PostResponse)
def create_post(
    title: str = Form(...),
    content: str = Form(...),
    author_id: int = Form(...),
    author: str = Form(...),
    avatar: Optional[str] = Form(None),
    image: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """Utwórz nowy post"""
    post = PostModel(
        title=title,
        content=content,
        author_id=author_id,
        author=author,
        avatar=avatar,
        image=image,
        timestamp=datetime.now().isoformat(),
        likes=0
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return PostResponse(
        id=post.id,
        author_id=post.author_id,
        author=post.author,
        avatar=post.avatar,
        title=post.title,
        content=post.content,
        timestamp=post.timestamp,
        image=post.image,
        likes=post.likes,
        comments=0,
        saves=0,
        tags=tags.split(",") if tags else []
    )

@app.get("/")
def root():
    return {"message": "SinceNet API", "version": "1.0.0"}
