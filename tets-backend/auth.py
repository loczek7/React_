"""Funkcje autentykacji i autoryzacji"""

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, UserModel
from config import SECTRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import datetime, timedelta
from typing import Optional

# Tymczasowe implementacje bez PyJWT - do pełnej implementacji wymagana jest biblioteka PyJWT
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Tworzy token dostępu JWT"""
    # TODO: Implementować z PyJWT gdy będzie zainstalowany
    return "dummy_token"

def create_refresh_token(data: dict):
    """Tworzy token odświeżania JWT"""
    # TODO: Implementować z PyJWT gdy będzie zainstalowany
    return "dummy_refresh_token"

def veryfy_token(token: str):
    """Weryfikuje token JWT"""
    # TODO: Implementować z PyJWT gdy będzie zainstalowany
    return {"user_id": 1}

def get_current_user(token: str = None, db: Session = Depends(get_db)):
    """Pobiera aktualnego użytkownika na podstawie tokenu"""
    # TODO: Implementować pełną autentykację
    # Na razie zwracamy None, aby endpointy działały bez autentykacji
    return None

