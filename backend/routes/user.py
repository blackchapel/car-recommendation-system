from fastapi import APIRouter, HTTPException, Depends # type: ignore
from datetime import timedelta
from models.user import User, UserRatingRequest, UserWOPass, UserTokenResponse
from configs.database import user_collection
from services.auth import currentUser
from services.auth import accessToken
import os

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

router = APIRouter()


# Get user API Endpoint
@router.get("", response_model=UserTokenResponse)
async def get_user(current_user: dict = Depends(currentUser)):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = accessToken(
        data={"sub": current_user["email"]}, expires_delta=access_token_expires
    )
    return { 
        "name": current_user["name"], 
        "email": current_user["email"],
        "ratings": current_user["ratings"],
        "access_token": access_token, 
        "token_type": "bearer"
    }


# Update user API Endpoint
@router.put("", response_model=UserWOPass)
async def update_user(user: User, current_user: dict = Depends(currentUser)):
    user_collection.update_one({"email": current_user['email']}, {"$set": user.dict()})
    return {
        "name": user["name"], 
        "email": user["email"],
        "ratings": user["ratings"]
    }


# Delete user API Endpoint
@router.delete("", response_model=dict)
async def delete_user(current_user: User = Depends(currentUser)):
    result = user_collection.delete_one({"email": current_user['email']})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Something went wrong")


# API Enpoint to store rating of a car given by a user
@router.post("/rating", response_model=UserWOPass)
async def user_rating(data: UserRatingRequest, current_user: dict = Depends(currentUser)):
    user = user_collection.find_one({"_id": current_user["_id"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_rating = {"index": data.index, "make_model": data.make_model, "rating": data.rating}
    user["ratings"].append(new_rating)
    user["ratings_copy"].append(new_rating)

    user_collection.update_one({"_id": user["_id"]}, {"$set": {"ratings": user["ratings"], "ratings_copy": user["ratings_copy"]}})

    updated_user = user_collection.find_one({"_id": current_user["_id"]})

    return {
        "name": updated_user["name"], 
        "email": updated_user["email"],
        "ratings": updated_user["ratings"]
    }
