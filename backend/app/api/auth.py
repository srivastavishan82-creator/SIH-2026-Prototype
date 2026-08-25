from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import authenticate_user, create_access_token
from app.schemas import UserCreate

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    # placeholder
    return {"message": "register endpoint"}

@router.post("/login")
def login(form_data: dict, db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.get("username"), form_data.get("password"))
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    # placeholder
    return {"message": "me endpoint"}
