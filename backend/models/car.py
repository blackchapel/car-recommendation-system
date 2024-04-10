from pydantic import BaseModel # type: ignore

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
