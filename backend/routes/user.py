from fastapi import APIRouter, HTTPException, Depends # type: ignore
from models.user import User
from configs.database import user_collection
from services.auth import currentUser

router = APIRouter()


@router.get("/user", response_model=User)
async def get_user(current_user: dict = Depends(currentUser)):
    return current_user


@router.put("/user", response_model=User)
async def update_user(user: User, current_user: dict = Depends(currentUser)):
    user_collection.update_one({"email": current_user['email']}, {"$set": user.dict()})
    return user


@router.delete("/user", response_model=dict)
async def delete_user(current_user: User = Depends(currentUser)):
    result = user_collection.delete_one({"email": current_user['email']})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Something went wrong")
