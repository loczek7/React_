import os
from datetime import timedelta
from pathlib import Path

SECTRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production-very-long-string")
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

DATABASE_URL = "sqlite:///./sinsenet.db"

ALLOWED_ORIGINS = [
    "http://localhost:3001",
    "http://localhost:3002",
]

DEV_USERS_FILE = Path(__file__).parent / "dev_users.json"

ALLOWED_FILE_EXTENSIONS = [
   "pdf", "docx", "doc", "txt", "rtf",
   "xls", "xlsx", "csv",
   "ppt", "pptx",
   "png", "jpg", "jpeg", "gif", "bmp", "svg",
   "zip", "rar", "7z",
   "json", "xml", "yaml", "yml",

]
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

def load_dev_users():

    users = []
    if not DEV_USERS_FILE.exists():
        return users
    
    try:
        with open(DEV_USERS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                users.append(line.strip())
                if not line or line.startswith("#"):
                    continue

                parts = line.split(":")
                if len(parts) == 3:
                    email, password, user_id = parts
                    user.append({
                        "email": email.strip(),
                        "password": password.strip(),
                        "user_id": user_id.strip()
                    })
    except Exception as e:
        print(f"Error loading dev users: {e}")

    return users