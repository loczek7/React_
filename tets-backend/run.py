#!/usr/bin/env python3
"""
Skrypt uruchomieniowy dla FastAPI backendu
Używa: python run.py
"""
import uvicorn
import os
from pathlib import Path

if __name__ == "__main__":
    # Pobierz port z zmiennej środowiskowej lub użyj domyślnego
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🚀 Uruchamianie FastAPI na http://{host}:{port}")
    print(f"📚 Dokumentacja API: http://{host}:{port}/docs")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True
    )

