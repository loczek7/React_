import string
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, JSON, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
import os

SQLALCHEMY_DATABASE_URL = "sqlite:///./sinsenet.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}, echo=False)
SessionLocal = sessionmaker[Session](autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column[int](Integer, primary_key=True, index=True)
    name = Column[str](String, nullable=False)
    title = Column[str](String) 
    avatar = Column[str](String)
    coverPhoto = Column[str](String)
    institution = Column[str](String)
    location = Column[str](String)
    education = Column[str](String)
    fields = Column[any](JSON)
    publications = Column[int](Integer, default=0)
    citations = Column[int](Integer, default=0)
    hIndex = Column[int](Integer, default=0)
    followers = Column[int](Integer, default=0)
    bio = Column[str](Text)
    photos = Column[any](JSON)
    skills = Column[any](JSON)

    publications_list = relationship("PublicationModel", back_populates="user", cascade="all, delete-orphan")
    experiments_list = relationship("ExperimentModel", back_populates="user", cascade="all, delete-orphan")
    education_history_list = relationship("EducationHistoryModel", back_populates="user", cascade="all, delete-orphan")
    posts = relationship("PostModel", back_populates="author_user", foreign_keys="PostModel.author_id")
    auth_methods = relationship("UserAuthModel", back_populates="user", cascade="all, delete-orphan")

class UserAuthModel(Base):
    __tablename__ = "user_auth"

    id = Column[int](Integer, primary_key=True, index=True)
    user_id = Column[int](Integer, ForeignKey("users.id"), nullable=False, index=True)

    provider = Column[str](String, nullable=False, index=True)

    provider_account_id = Column[str](String, nullable=False, index=True)
    provider_account_secret = Column[str](String, nullable=False)

    created_at = Column[str](String)

    user = relationship("UserModel", back_populates="auth_methods")

    _table_args__ = (
        ("sqlite_autoincrement", True),
    )

class PublicationModel(Base):
    __tablename__ = "publications"

    id = Column[int](Integer, primary_key=True, index=True)
    user_id = Column[int](Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column[str](String, nullable=False)
    authors = Column[str](String)
    journal = Column[str](String)
    year = Column[int](Integer)
    citations = Column[int](Integer, default=0)
    impactfactor = Column[any](Float)

    user = relationship("UserModel", back_populates="publications_list")

class ExperienceModel(Base):
    __tablename__ = "experiments"

    id = Column[int](Integer, primary_key=True, index=True)
    user_id = Column[int](Integer, ForeignKey("users.id"), nullable=False, index=True)
    position = Column[str](String, nullable=False)
    institution = Column[str](String, nullable=False)
    period = Column[str](String)

    user = relationship("UserModel", back_populates="experiments_list")

class EducationHistoryModel(Base):
    __tablename__ = "education_history"

    id = Column[int](Integer, primary_key=True, index=True)
    user_id = Column[int](Integer, ForeignKey("users.id"), nullable=False)
    degree = Column[str](String, nullable=False)
    institution = Column[str](String)
    period = Column[str](String)

    user = relationship("UserModel", back_populates="education_history_list")

class PostModel(Base):
    __tablename__ = "posts"

    id = Column[int](Integer, primary_key=True, index=True)
    author_id = Column[int](Integer, ForeignKey("users.id"), nullable=False, index=True)
    author = Column[str](String, nullable=False)
    avatar = Column[str](String)
    title = Column[str](String, nullable=False)
    content = Column[str](Text, nullable=False)
    timestamp = Column[str](String)
    image = Column[str](String, nullable=True)
    likes = Column[int](Integer, default=0)
    is_public = Column[int](Integer, default=1)

    author_user = relationship("UserModel", back_populates="posts", foreign_keys=[author_id])
    comments = relationship("CommentModel", back_populates="post", cascade="all, delete-orphan")
    files = relationship("PostFileModel", back_populates="post", cascade="all, delete-orphan")

class PostFileModel(Base):
    __tablename__ = "post_files"

    id = Column[int](Integer, primary_key=True)
    post_id = Column[int](Integer, ForeignKey("posts.id"), nullable=False)
    filename = Column[str](String, nullable=False)
    stored_filename = Column[str](String, nullable=False)
    file_path = Column[str](String, nullable=False)
    file_size = Column[int](Integer)
    file_type = Column[str](String)
    uploaded_at = Column[str](String)

    post = relationship("PostModel", back_populates="files")

class CommentModel(Base):
    __tablename__ = "comments"

    id = Column[int](Integer, primary_key=True, index=True)
    post_id = Column[int](Integer, ForeignKey("posts.id"), nullable=False)
    author = Column[str](String, nullable=False)
    avatar = Column[str](String)
    content = Column[str](Text, nullable=False)
    timestamp = Column[str](String)

    post = relationship("PostModel", back_populates="comments")

class CourseModel(Base):
    __tablename__ = "courses"

    id = Column[int](Integer, primary_key=True, index=True)
    title = Column[str](String, nullable=False)
    educator = Column[str](String, nullable=False)
    image = Column[str](String)
    duration = Column[str](String)
    students = Column[str](String)
    rating = Column[Float]
    level = Column[str](String)
    price = Column[str](String)
    description = Column[str](Text)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
