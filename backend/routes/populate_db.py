from fastapi import APIRouter # type: ignore
import pandas as pd # type: ignore
from configs.database import car_collection, user_collection
from services.auth import hashPassword
from models.car import Car
from models.user import User

router = APIRouter()


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
        "name": "John Doe",
        "email": "johndoe",
        "password": "pass@123",
        "ratings": [
            {
                "index": 0,
                "make_model": "Chevrolet Silverado 4WD",
                "rating": 5
            },
            {
                "index": 1,
                "make_model": "Alfa Romeo Stelvio AWD",
                "rating": 4
            },
            {
                "index": 3,
                "make_model": "Genesis G80 AWD",
                "rating": 4
            },
            {
                "index": 16,
                "make_model": "BMW i5 eDrive40 Sedan (20 inch Wheels)",
                "rating": 3
            },
            {
                "index": 2,
                "make_model": "BMW Z4 sDrive30i",
                "rating": 3
            },
            {
                "index": 1358,
                "make_model": "Audi R8",
                "rating": 4
            },
            {
                "index": 1601,
                "make_model": "Audi R8 AWD",
                "rating": 3
            }
        ]
    }
    new_user["password"] = hashPassword(new_user["password"])
    user_collection.insert_one(new_user)
    
    return { "message": "Database populated!" }
