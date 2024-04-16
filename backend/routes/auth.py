from fastapi import APIRouter, HTTPException, status # type: ignore
from datetime import timedelta
from models.user import User, UserLoginRequest, UserSignupRequest,UserTokenResponse
from services.auth import userAuth, accessToken, hashPassword
from configs.database import user_collection, get_next_sequence
import os

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

router = APIRouter()


# API Endpoint for login
@router.post("/login", response_model=UserTokenResponse)
async def login(form_data: UserLoginRequest):
    user: User = userAuth(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = accessToken(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return { 
        "name": user["name"], 
        "email": user["email"],
        "ratings": user["ratings"],
        "access_token": access_token, 
        "token_type": "bearer"
    }


# API Endpoint for Signup
@router.post("/signup", response_model=UserTokenResponse)
async def signup(user: UserSignupRequest):
    user.password = hashPassword(user.password)
    newUser: User = User(sequence=(get_next_sequence()+1000),name=user.name, email=user.email, password=user.password, ratings=[], ratings_copy=[])
    user_collection.insert_one(newUser.dict())
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = accessToken(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return { 
        "name": newUser.name, 
        "email": newUser.email,
        "ratings": newUser.ratings,
        "access_token": access_token, 
        "token_type": "bearer"
    }
