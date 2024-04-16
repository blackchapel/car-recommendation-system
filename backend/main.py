from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import uvicorn # type: ignore
from routes.auth import router as auth_router # type: ignore
from routes.user import router as user_router # type: ignore
from routes.car import router as cars_router # type: ignore
from routes.populate_db import router as populate_db_router

# Initializing FastAPI
app = FastAPI()

# Setting up CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tags for Swagger Documentation
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
    {
        "name": "Database"
    },
]


# Setting all routes
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(user_router, prefix="/api/user", tags=["User"])
app.include_router(cars_router, prefix="/api/car", tags=["Car"])
app.include_router(populate_db_router, prefix="/api/populate", tags=["Database"])


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)