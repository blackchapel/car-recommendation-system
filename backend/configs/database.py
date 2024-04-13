import os
from pymongo import MongoClient # type: ignore
from dotenv import load_dotenv # type: ignore

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["jtp"]

user_collection = db["users"]
car_collection = db["cars"]

def get_next_sequence():
    users = list(user_collection.find())
    return len(users)