from fastapi import FastAPI, HTTPException, Depends,UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
import ucivorn
import os
import uuid
import mimetypes
from database import get_db, init_db
from database import UserModel, PostModel, CommentModel, PublicationModel, ExperimentModel, UserAuthModel, PostFileModel
from auth import get_current_user, create_access_token, create_refresh_token, veryfy_token
from auth_utils import hash_password, verify_password
from config import AlLOWED_ORIGINS, load_dev_users,ALLOWED_FILE_ExTENSIONS, MAX_FILE_SIZE, UPLOAD_DIR
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
