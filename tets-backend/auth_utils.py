"""Funkcje pomocnicze do hashowania haseł"""

import hashlib

def hash_password(password: str) -> str:
    """Hashuje hasło używając SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Weryfikuje hasło porównując hash"""
    return hash_password(plain_password) == hashed_password

