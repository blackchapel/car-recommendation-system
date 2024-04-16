from fastapi import APIRouter # type: ignore
import pandas as pd # type: ignore
from configs.database import car_collection, user_collection
from services.auth import hashPassword
from models.car import Car
from models.user import User

router = APIRouter()

# API Endpoint to populate local db using the csv in data folder
@router.get("/database", response_model=dict)
async def populate_database():
    cars = pd.read_csv('./data/final_car_data.csv')
    new_cars = []
    for i in range(0, 4870):
        car: Car = cars.iloc[i]
        new_car = {
            "index": int(i),
            "make": str(car["Make"]),
            "model": str(car["Model"]),
            "make_model": str(car["Make"] + " " + car["Model"]),
            "city_mpg_for_fuel_type1": int(car["City Mpg For Fuel Type1"]),
            "co2_fuel_type1": int(car["Co2 Fuel Type1"]),
            "cylinders": int(car["Cylinders"]),
            "drive": str(car["Drive"]),
            "annual_fuel_cost_for_fuel_type1":
              int(car["Annual Fuel Cost For Fuel Type1"]),
            "fuel_type": str(car["Fuel Type"]),
            "id": int(car["ID"]),
            "transmission": str(car["Transmission"]),
            "vehicle_size_class": str(car["Vehicle Size Class"]),
            "year": str(car["Year"]),
            "atv_type": str(car["ATV Type"]),
            "electric_motor": str(car["Electric motor"]),
            "base_model": str(car["baseModel"]),
            "image": str(car["Image"]),
            "price": str(car["Price"]),
        }
        new_cars.append(new_car)
    car_collection.insert_many(new_cars)

    new_user: User = {
        "sequence": 1000,
        "name": "John Doe",
        "email": "johndoe",
        "password": "pass@123",
        "ratings": [
            {
                "index": 435,
                "make_model": "BMW iX xDrive40 (20 inch Wheels)",
                "rating": 4
            },
            {
                "index": 249,
                "make_model": "Toyota Grand Highlander Hybrid AWD",
                "rating": 5
            },
            {
                "index": 385,
                "make_model": "Audi Q8 e-tron quattro",
                "rating": 5
            },
            {
                "index": 257,
                "make_model": "Kia EV6 Long Range RWD",
                "rating": 4
            },
            {
                "index": 103,
                "make_model": "Hyundai Ioniq 5 Standard range RWD",
                "rating": 5
            }
        ],
        "ratings_copy": [
            {
                "index": 435,
                "make_model": "BMW iX xDrive40 (20 inch Wheels)",
                "rating": 4
            },
            {
                "index": 249,
                "make_model": "Toyota Grand Highlander Hybrid AWD",
                "rating": 5
            },
            {
                "index": 385,
                "make_model": "Audi Q8 e-tron quattro",
                "rating": 5
            },
            {
                "index": 257,
                "make_model": "Kia EV6 Long Range RWD",
                "rating": 4
            },
            {
                "index": 103,
                "make_model": "Hyundai Ioniq 5 Standard range RWD",
                "rating": 5
            }
        ]
    }
    new_user["password"] = hashPassword(new_user["password"])
    user_collection.insert_one(new_user)
    
    return { "message": "Database populated!" }
