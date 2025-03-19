from fastapi import FastAPI, HTTPException, Query, Path
from pydantic import BaseModel
from typing import List, Optional
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List


load_dotenv()


firebase_credentials_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
if not firebase_credentials_path:
    raise ValueError("FIREBASE_CREDENTIALS_PATH not set in .env")

cred = credentials.Certificate(firebase_credentials_path)
firebase_admin.initialize_app(cred)
db = firestore.client()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  
    allow_headers=["*"],
)

# Pydantic models
class User(BaseModel):
    id: int
    name: str
    phone_no: str
    address: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone_no: Optional[str] = None
    address: Optional[str] = None

# 1. Create a new user
@app.post("/users/", status_code=201)
def create_user(user: User):
    user_ref = db.collection('users').document(str(user.id))
    if user_ref.get().exists:
        raise HTTPException(status_code=400, detail="User ID already exists")
    user_ref.set(user.dict())
    return {"message": "User created successfully"}

# 3. Search users by name
@app.get("/users/search", response_model=List[User])
def search_users(name: Optional[str] = Query(None)):
    if not name:
        raise HTTPException(status_code=400, detail="Name query parameter is required")
        
    result = []
    print(name)
    print(name.lower())
    query = db.collection('users').where('name', '==', name.lower()).stream()
    for doc in query:
        user = doc.to_dict()
        if user["name"].lower() == name.lower():
            result.append(user)
    return result

# 2. Read user by ID
@app.get("/users/{id}", response_model=User)
def get_user(id: int):
    user_ref = db.collection('users').document(str(id)).get()
    if not user_ref.exists:
        raise HTTPException(status_code=404, detail="User not found")
    return user_ref.to_dict()


# 4. Update user details
@app.put("/users/{id}")
def update_user(id: int, user_update: UserUpdate):
    user_ref = db.collection('users').document(str(id))
    if not user_ref.get().exists:
        raise HTTPException(status_code=404, detail="User not found")

    updates = {k: v for k, v in user_update.dict().items() if v is not None}
    user_ref.update(updates)
    return {"message": "User updated successfully"}

# 5. Delete user by ID
@app.delete("/users/{id}")
def delete_user(id: int):
    user_ref = db.collection('users').document(str(id))
    if not user_ref.get().exists:
        raise HTTPException(status_code=404, detail="User not found")
    user_ref.delete()
    return {"message": "User deleted successfully"}
