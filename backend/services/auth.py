from fastapi import HTTPException, Depends # type: ignore
from fastapi.security import OAuth2PasswordBearer # type: ignore
from passlib.context import CryptContext # type: ignore
from typing import Optional
from jose import JWTError, jwt # type: ignore
from datetime import datetime, timedelta
from configs.database import user_collection
from models.user import User
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Function to verify credentials on login
def userAuth(email: str, password: str):
    user: User = user_collection.find_one({"email": email})
    if not user or not verifyPassword(password, user['password']):
        return False
    return user


# Fucntion to generate JWT based access tokens
def accessToken(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Function to compare password hash
def verifyPassword(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# Fucntion to hash password
def hashPassword(password):
    return pwd_context.hash(password)


# Middleware function to check for JWT access token for API Endpoints which require authentication
async def currentUser(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    user = user_collection.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
