# EduLearn Frontend - Next.js

Frontend aplikacji edukacyjnej EduLearn zbudowany w Next.js.

## 🚀 Szybki Start

### Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. (Opcjonalnie) Skopiuj plik .env.example do .env.local:
```bash
# Windows
copy .env.example .env.local

# Linux/Mac
cp .env.example .env.local
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

## 🔧 Konfiguracja

### Zmienne Środowiskowe

Utwórz plik `.env.local` w katalogu `project/`:

```env
FASTAPI_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Uwaga:** Upewnij się, że backend FastAPI działa na porcie 8000!

## 🧪 Testy

### Uruchomienie testów Playwright

```bash
# Tryb headless (bez widocznej przeglądarki)
npm run test:e2e

# Tryb headed (z widoczną przeglądarką)
npm run test:e2e:headed
```

Screenshoty z testów są zapisywane w katalogu `screenshots/`.

## 📁 Struktura

```
project/
├── app/
│   ├── api/              # Next.js API routes (proxy do FastAPI)
│   ├── components/       # Komponenty React
│   ├── lib/              # Funkcje pomocnicze
│   ├── types/            # Typy TypeScript
│   └── page.tsx          # Strona główna
├── tests/                # Testy Playwright
├── screenshots/          # Screenshoty z testów
└── playwright.config.ts  # Konfiguracja Playwright
```

## 🛠️ Skrypty NPM

- `npm run dev` - Uruchom serwer deweloperski (port 3001)
- `npm run build` - Zbuduj aplikację produkcyjną
- `npm run start` - Uruchom aplikację produkcyjną
- `npm run lint` - Uruchom linter
- `npm run test:e2e` - Uruchom testy E2E (headless)
- `npm run test:e2e:headed` - Uruchom testy E2E (headed)

## 📝 Funkcjonalności

- ✅ Strona główna z feedem postów
- ✅ Strona kursów
- ✅ Biblioteka użytkownika
- ✅ Wiadomości
- ✅ Powiadomienia
- ✅ Postęp nauki
- ✅ Tworzenie i edycja postów
- ✅ Połączenie z API FastAPI przez Next.js API routes

## 🔗 Połączenie z Backendem

Frontend komunikuje się z backendem przez Next.js API routes (`/api/posts`, `/api/courses`), które działają jako proxy do FastAPI.

Upewnij się, że:
1. Backend FastAPI działa na http://localhost:8000
2. Zmienna `FASTAPI_URL` w `.env.local` wskazuje na właściwy adres

## 📄 Licencja

Ten projekt jest prywatny.
