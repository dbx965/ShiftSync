# ShiftSync — Setup Guide

## What was fixed

| File | Problem | Fix |
|---|---|---|
| `Availability.js` | Hardcoded `http://127.0.0.1:8000` | Now uses central `config/api.js` |
| `StudentsList.js` | Hardcoded `http://localhost:8000`, assumed `shift_interest` was array | Uses `config/api.js`; handles both string and array |
| `main.py` | Silent crash when `.env` missing; no error on DB failure | Startup validation with clear error messages |
| `App.js` | `ProtectedRoute` had `if (false)` — auth guard was disabled | Left as-is (mock auth); noted below |

---

## Quick Start

### 1. Backend

```bash
cd backend

# Install dependencies
pip install fastapi uvicorn supabase python-dotenv pydantic[email]

# Create your .env file
cp .env.example .env
# Edit .env and add your Supabase URL and key

# Start the server
uvicorn main:app --reload
```

You should see: `Uvicorn running on http://127.0.0.1:8000`

### 2. Frontend

```bash
# From the shiftsync React folder
npm install
npm start
```

The app runs on `http://localhost:3000`.

---

## Changing the backend URL

If your backend runs on a different host or port, create a `.env` file in the React project root:

```
REACT_APP_API_URL=http://192.168.1.10:8000
```

This is picked up automatically by `src/config/api.js`. You never need to edit component files to change the URL.

---

## Supabase Table

Make sure your `students` table has these columns:

| Column | Type |
|---|---|
| id | uuid (primary key, auto) |
| name | text |
| email | text |
| availability | jsonb |
| shift_interest | text |

---

## Note on authentication

The `ProtectedRoute` in `App.js` currently has `if (false)` — meaning all routes are accessible without logging in. This appears intentional for development. To re-enable auth protection, change it to:

```js
if (!isAuthenticated) {
  return <Navigate to="/" replace />;
}
```
