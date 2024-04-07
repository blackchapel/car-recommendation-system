from fastapi import FastAPI, HTTPException, Depends, status, Query # type: ignore
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm # type: ignore
from passlib.context import CryptContext # type: ignore
from pymongo import MongoClient # type: ignore
from typing import Optional
from jose import JWTError, jwt # type: ignore
from datetime import datetime, timedelta
from pydantic import BaseModel # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore

origins = [
    "http://localhost:3000",
]

client = MongoClient("mongodb+srv://rokundhita:dvki-the-best@cluster0.lg9hmzs.mongodb.net/?retryWrites=true&w=majority")
db = client["jtp"]
user_collection = db["users"]
car_collection = db["cars"]

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

tags_metadata = [
    {
        "name": "Auth"
    },
    {
        "name": "User"
    },
    {
        "name": "Car"
    },
]

app = FastAPI(openapi_tags=tags_metadata)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class User(BaseModel):
    name: str
    email: str
    password: str

class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserTokenResponse(BaseModel):
    name: str
    email: str
    access_token: str
    token_type: str

class Car(BaseModel):
    index: int
    make: str
    model: str
    city_mpg_for_fuel_type1: int
    co2_fuel_type1: int
    cylinders: int
    drive: str
    annual_fuel_cost_for_fuel_type1: int
    fuel_type: str
    id: int
    transmission: str
    vehicle_size_class: str
    year: str
    atv_type: str
    base_model: str
    image: str
    price: str


def userAuth(email: str, password: str):
    user: User = user_collection.find_one({"email": email})
    if not user or not verifyPassword(password, user['password']):
        return False
    return user


def accessToken(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verifyPassword(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def hashPassword(password):
    return pwd_context.hash(password)


@app.post("/api/auth/login", tags=["Auth"], response_model=UserTokenResponse)
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
        "access_token": access_token, 
        "token_type": "bearer"
    }


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


@app.post("/api/auth/signup", tags=["Auth"],response_model=UserTokenResponse)
async def signup(user: User):
    user.password = hashPassword(user.password)
    user_collection.insert_one(user.dict())
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = accessToken(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return { 
        "name": user.name, 
        "email": user.email,
        "access_token": access_token, 
        "token_type": "bearer"
    }


@app.get("/api/user", tags=["User"], response_model=User)
async def get_user(current_user: dict = Depends(currentUser)):
    return current_user


@app.put("/api/user", tags=["User"], response_model=User)
async def update_user(user: User, current_user: dict = Depends(currentUser)):
    user_collection.update_one({"email": current_user['email']}, {"$set": user.dict()})
    return user


@app.delete("/api/user", tags=["User"], response_model=dict)
async def delete_user(current_user: User = Depends(currentUser)):
    result = user_collection.delete_one({"email": current_user['email']})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Something went wrong")


@app.get("/api/cars/autocomplete/", tags=["Car"], response_model=list[Car])
async def autocomplete_cars(name: str = Query(...)):
    regex = {"$regex": f".*{name}.*", "$options": "i"}
    cars: Car = car_collection.find({"make_model": regex}, {"_id": 0, "index": 1, "make": 1, "model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "base_model": 1, "image": 1, "price": 1}).limit(50)
    return cars


if __name__ == "__main__":
    import uvicorn # type: ignore

    uvicorn.run(app, host="0.0.0.0", port=8000)
