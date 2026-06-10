from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
import os
import sys

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing SUPABASE_URL or SUPABASE_KEY in your .env file.")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
