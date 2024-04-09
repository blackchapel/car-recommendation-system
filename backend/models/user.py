from pydantic import BaseModel # type: ignore
from typing import List, Dict

class User(BaseModel):
    name: str
    email: str
    password: str
    ratings: list

class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserSignupRequest(BaseModel):
    name: str
    email: str
    password: str

class UserTokenResponse(BaseModel):
    name: str
    email: str
    ratings: list
    access_token: str
    token_type: str
