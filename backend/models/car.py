from pydantic import BaseModel # type: ignore

class Car(BaseModel):
    index: int
    make: str
    model: str
    make_model: str
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
    electric_motor: str
    base_model: str
    image: str
    price: str

class CarRecommendRequest(BaseModel):
    city_mpg_for_fuel_type1: str
    co2_fuel_type1: str
    cylinders: str
    drive: str
    annual_fuel_cost_for_fuel_type1: str
    fuel_type: str
    transmission: str
    vehicle_size_class: str
    year: str
    atv_type: str
    electric_motor: str
    price: str