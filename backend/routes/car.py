from fastapi import APIRouter, Query # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import pandas as pd # type: ignore
from gensim.models import Word2Vec # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
import numpy as np # type: ignore
from models.car import Car
from configs.database import car_collection 

router = APIRouter()


@router.get("/autocomplete/", response_model=list[Car])
async def autocomplete_cars(name: str = Query(...)):
    regex = {"$regex": f".*{name}.*", "$options": "i"}
    cars: Car = car_collection.find({"make_model": regex}, {"_id": 0, "index": 1, "make": 1, "model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "base_model": 1, "image": 1, "price": 1}).limit(50)
    return cars


@router.get("/search-recommendation", response_model=list[Car])
async def search_recommendation(index: str = Query(...)):
    data = pd.read_csv('../data/final_car_data.csv')
    data.astype(str)
    car_features_list = data.iloc[:, :].values.tolist()
    model = Word2Vec.load('../data/word2vec_model_similarity')

    def calculate_similarity(vec1, vec2):
        return cosine_similarity([vec1], [vec2])[0][0]

    def get_word_vector(feature):
        return model.wv[feature]

    def get_average_vector(features):
        vectors = [get_word_vector(feature) for feature in features if feature in model.wv]
        if vectors:
            return np.mean(vectors, axis=0)
        else:
            return None

    car_vectors_data = pd.read_csv('../data/car_vectors_similarity.csv')

    index = int(index)
    user_preference = car_features_list[index]
    user_preference = [str(element) for element in user_preference]

    user_preference_vector = get_average_vector(user_preference)

    car_similarities = {}
    for index, row in car_vectors_data.iterrows():
        car_vector = row.tolist()
        similarity = calculate_similarity(user_preference_vector, car_vector)
        car_similarities[index] = {'similarity': similarity}

    sorted_cars = sorted(car_similarities.items(), key=lambda x: x[1]['similarity'], reverse=True)

    cars: list[Car] = []
    for car_index, car_info in sorted_cars[:18]:
        car: Car = car_collection.find({"index": car_index}, {"_id": 0, "index": 1, "make": 1, "model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "base_model": 1, "image": 1, "price": 1})
        cars.append(car[0])
    
    return cars
