import os
from pymongo import MongoClient # type: ignore
from dotenv import load_dotenv # type: ignore

load_dotenv()

# Connecting to MongoDB
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["car-recommendation"]

# Initializing various collections
user_collection = db["users"]
car_collection = db["cars"]

# Function to obtain number of users registered
def get_next_sequence():
    users = list(user_collection.find())
    return len(users)