# FastAPI Backend - EduLearn

Backend API dla platformy edukacyjnej EduLearn.

## 🚀 Szybki Start

### Instalacja

1. Utwórz środowisko wirtualne (zalecane):
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
```

2. Zainstaluj zależności:
```bash
pip install -r requirements.txt
```

3. (Opcjonalnie) Skopiuj plik .env.example do .env i dostosuj:
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

4. (Opcjonalnie) Wypełnij bazę danych przykładowymi danymi:
```bash
python seed_data.py
```

5. Uruchom serwer:
```bash
# Opcja 1: Używając skryptu run.py
python run.py

# Opcja 2: Bezpośrednio przez uvicorn
python -m uvicorn main:app --reload --port 8000
```

## 📚 API Dokumentacja

Po uruchomieniu serwera, dokumentacja API jest dostępna pod:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔧 Konfiguracja

### Zmienne Środowiskowe

Utwórz plik `.env` w katalogu `tets-backend/`:

```env
SECRET_KEY=your-secret-key-change-this-in-production-very-long-string
DATABASE_URL=sqlite:///./sinsenet.db
PORT=8000
HOST=0.0.0.0
```

### Baza Danych

Domyślnie używana jest SQLite (`sinsenet.db` w katalogu backendu).
Baza jest automatycznie tworzona przy pierwszym uruchomieniu.

## 📁 Struktura

```
tets-backend/
├── main.py           # Główny plik FastAPI
├── database.py       # Modele bazy danych (SQLAlchemy)
├── config.py         # Konfiguracja aplikacji
├── auth.py           # Autentykacja
├── auth_utils.py     # Narzędzia do autentykacji
├── seed_data.py      # Skrypt do wypełniania bazy
├── run.py            # Skrypt uruchomieniowy
└── requirements.txt  # Zależności Python
```

## 🛠️ Endpointy API

- `GET /` - Informacje o API
- `GET /api/posts` - Pobierz wszystkie posty
- `POST /api/posts` - Utwórz nowy post
- `GET /api/courses` - Pobierz wszystkie kursy

## 📝 Uwagi

- Baza danych SQLite jest tworzona automatycznie
- Wszystkie ścieżki są względne (używają `Path(__file__).parent`)
- CORS jest skonfigurowany dla localhost:3001

