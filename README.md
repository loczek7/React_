# EduLearn - Platforma Edukacyjna

Platforma edukacyjna do nauki i dzielenia się wiedzą, zbudowana z Next.js (frontend) i FastAPI (backend).

## 🚀 Szybki Start

### Wymagania

- Node.js 18+ 
- Python 3.10+
- npm lub yarn

### Instalacja Frontendu

1. Przejdź do katalogu projektu:
```bash
cd project
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Zainstaluj przeglądarki Playwright (dla testów):
```bash
npx playwright install
```

4. Uruchom serwer deweloperski:
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:3001

### Instalacja Backendu

1. Przejdź do katalogu backendu:
```bash
cd tets-backend
```

2. Utwórz środowisko wirtualne (opcjonalnie, ale zalecane):
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
```

3. Zainstaluj zależności:
```bash
pip install -r requirements.txt
```

4. (Opcjonalnie) Wypełnij bazę danych przykładowymi danymi:
```bash
python seed_data.py
```

5. Uruchom serwer FastAPI:
```bash
python -m uvicorn main:app --reload --port 8000
```

Backend będzie dostępny pod adresem: http://localhost:8000

API dokumentacja: http://localhost:8000/docs

## 📁 Struktura Projektu

```
.
├── project/              # Frontend (Next.js)
│   ├── app/             # Aplikacja Next.js
│   ├── tests/           # Testy Playwright
│   └── screenshots/     # Screenshoty z testów
├── tets-backend/         # Backend (FastAPI)
│   ├── main.py          # Główny plik API
│   ├── database.py      # Modele bazy danych
│   └── seed_data.py     # Skrypt do wypełniania bazy
└── README.md            # Ten plik
```

## 🔧 Konfiguracja

### Zmienne Środowiskowe

#### Frontend (.env.local w katalogu project/)

```env
FASTAPI_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### Backend (.env w katalogu tets-backend/)

```env
SECRET_KEY=your-secret-key-change-this-in-production-very-long-string
DATABASE_URL=sqlite:///./sinsenet.db
```

## 🧪 Testy

### Uruchomienie testów Playwright

```bash
cd project
npm run test:e2e          # Tryb headless
npm run test:e2e:headed  # Tryb z widocznym przeglądarką
```

## 📝 Funkcjonalności

- ✅ Strona główna z feedem postów
- ✅ Strona kursów
- ✅ Biblioteka użytkownika
- ✅ Wiadomości
- ✅ Powiadomienia
- ✅ Postęp nauki
- ✅ Tworzenie i edycja postów
- ✅ Połączenie z API FastAPI

## 🛠️ Technologie

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Playwright (testy E2E)

### Backend
- FastAPI
- SQLAlchemy
- SQLite

## 📄 Licencja

Ten projekt jest prywatny.

## 🤝 Wsparcie

W razie problemów sprawdź:
1. Czy wszystkie zależności są zainstalowane
2. Czy porty 3001 (frontend) i 8000 (backend) są wolne
3. Czy zmienne środowiskowe są poprawnie ustawione
