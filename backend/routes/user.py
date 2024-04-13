from fastapi import APIRouter, HTTPException, Depends # type: ignore
from models.user import User, UserRatingRequest, UserWOPass
from configs.database import user_collection
from services.auth import currentUser

router = APIRouter()


@router.get("", response_model=UserWOPass)
async def get_user(current_user: dict = Depends(currentUser)):
    return {
        "name": current_user["name"], 
        "email": current_user["email"],
        "ratings": current_user["ratings"]
    }


@router.put("", response_model=UserWOPass)
async def update_user(user: User, current_user: dict = Depends(currentUser)):
    user_collection.update_one({"email": current_user['email']}, {"$set": user.dict()})
    return {
        "name": user["name"], 
        "email": user["email"],
        "ratings": user["ratings"]
    }


@router.delete("", response_model=dict)
async def delete_user(current_user: User = Depends(currentUser)):
    result = user_collection.delete_one({"email": current_user['email']})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Something went wrong")


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
