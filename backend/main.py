from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client
from dotenv import load_dotenv
import os
import sys

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validate env vars at startup so you get a clear error instead of a cryptic crash
if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing SUPABASE_URL or SUPABASE_KEY in your .env file.")
    print("Create a .env file next to main.py with:")
    print("  SUPABASE_URL=https://your-project.supabase.co")
    print("  SUPABASE_KEY=your-anon-key")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# CORS middleware — allows requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3003",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3003",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic model for student validation
class StudentCreate(BaseModel):
    name: str
    email: str
    availability: dict
    shift_interest: str


@app.get("/")
def home():
    return {"message": "ShiftSync API Running"}


@app.get("/students")
def get_students():
    try:
        response = supabase.table("students").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.post("/students")
def create_student(student: StudentCreate):
    try:
        data = {
            "name": student.name,
            "email": student.email,
            "availability": student.availability,
            "shift_interest": student.shift_interest,
        }
        response = supabase.table("students").insert(data).execute()
        return {"message": "Student saved successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
