from fastapi import APIRouter, Query, Depends # type: ignore
import pickle
import pandas as pd # type: ignore
import numpy as np # type: ignore
from gensim.models import Word2Vec # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
from sklearn.metrics import pairwise_distances # type: ignore
from models.car import Car, CarRecommendRequest
from models.user import User
from services.auth import currentUser
from configs.database import car_collection, user_collection
import joblib # type: ignore
import tensorflow as tf # type: ignore
from tensorflow import keras # type: ignore
from keras.layers import Input, Embedding, Reshape, Dot, Concatenate, Dense, Dropout # type: ignore
from keras.models import Model # type: ignore
from keras.utils import plot_model # type: ignore
from scipy.sparse import vstack # type: ignore
from sklearn.metrics import mean_squared_error # type: ignore

router = APIRouter()


# API Endpoint to autocomplete user queries about cars
@router.get("/autocomplete/", response_model=list[Car])
async def autocomplete_cars(name: str = Query(...)):
    regex = {"$regex": f".*{name}.*", "$options": "i"}
    cars: Car = car_collection.find({"make_model": regex}, {"_id": 0, "index": 1, "make": 1, "model": 1, "make_model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "electric_motor": 1, "base_model": 1, "image": 1, "price": 1}).limit(20)
    return cars


# API Endpoint to fetch details of all the cars that the user has rated
@router.get("/car-by-user-rating", response_model=list[Car])
async def car_by__user_rating(current_user: User = Depends(currentUser)):
    cars = []
    for i in current_user["ratings"]:
        car: Car = car_collection.find({"index": i["index"]}, {"_id": 0, "index": 1, "make": 1, "model": 1, "make_model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "electric_motor": 1, "base_model": 1, "image": 1, "price": 1})
        cars.append(car[0])
    
    return cars


# API Endpoint which is used to recommend cars based on users query
@router.get("/recommend/word-embeddings", response_model=list[Car])
async def recommendation_word_embeddings(index: str = Query(...)):
    data = pd.read_csv('./data/final_car_data.csv')
    data.astype(str)
    car_features_list = data.iloc[:, :].values.tolist()
    model = Word2Vec.load('./data/word2vec_model_similarity')

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

    car_vectors_data = pd.read_csv('./data/car_vectors_similarity.csv')

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
    for car_index, car_info in sorted_cars[:10]:
        car: Car = car_collection.find({"index": car_index}, {"_id": 0, "index": 1, "make": 1, "model": 1, "make_model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "electric_motor": 1, "base_model": 1, "image": 1, "price": 1})
        cars.append(car[0])
    
    return cars


# API Endpoint which is used to recommend cars based on questionnaire filled by a user
@router.post("/recommend/kmeans", response_model=list[Car])
async def recommendation_kmeans(userPreference: CarRecommendRequest):
    data_user_preference = {
        'City Mpg For Fuel Type1': [userPreference.city_mpg_for_fuel_type1],
        'Co2 Fuel Type1': [userPreference.co2_fuel_type1],
        'Vehicle Size Class': [userPreference.vehicle_size_class],
        'Year': [userPreference.year],
        'ATV Type': [userPreference.atv_type],
        'Price': [userPreference.price],
    }
    df = pd.DataFrame(data_user_preference)

    with open('./data/kmeans_model.pkl', 'rb') as f:
        loaded_kmeans = pickle.load(f)
    centroid_vectors = loaded_kmeans.cluster_centers_
    model = Word2Vec.load("./data/word2vec_model_cluster")

    def get_word_vector(feature):
        return model.wv[feature]

    def get_average_vector(features):
        vectors = [get_word_vector(feature) for feature in features if feature in model.wv]
        if vectors:
            return np.mean(vectors, axis=0)
        else:
            return None
        
    scaler = joblib.load('./data/minmax_scaler.pkl')
    centroid_vectors = loaded_kmeans.cluster_centers_
    user_preference_vector = get_average_vector(df.iloc[0])
    user_preference_vector = pd.DataFrame(user_preference_vector).T
    user_preference_vector.columns = [f'feature_{i}' for i in range(len(user_preference_vector.columns))]
    user_preference_vector = pd.DataFrame(scaler.transform(user_preference_vector), columns = user_preference_vector.columns)

    distances = pairwise_distances(user_preference_vector, centroid_vectors, metric='euclidean')
    closest_center_index = np.argmin(distances)

    car_vectors_cluster_label = pd.read_csv('./data/car_vectors_cluster_label.csv')

    similiar_cars_vectors = car_vectors_cluster_label.loc[car_vectors_cluster_label['cluster_label'] == closest_center_index]
    car_data = similiar_cars_vectors.drop(columns=['Unnamed: 0', 'cluster_label'])

    user_preference = user_preference_vector.values.squeeze()

    def calculate_similarity(vec1, vec2):
        return cosine_similarity([vec1], [vec2])[0][0]

    car_similarities = {}
    for index, row in car_data.iterrows():
        car_vector = row.values
        similarity = calculate_similarity(user_preference, car_vector)
        car_similarities[index] = {'similarity': similarity}

    sorted_cars = sorted(car_similarities.items(), key=lambda x: x[1]['similarity'], reverse=True)

    cars: list[Car] = []
    for car_index, car_info in sorted_cars[:18]:
        car: Car = car_collection.find({"index": car_index}, {"_id": 0, "index": 1, "make": 1, "model": 1, "make_model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "electric_motor": 1, "base_model": 1, "image": 1, "price": 1})
        cars.append(car[0])
    
    return cars


# API Endpoint which is used to recommend cars based on user ratings
@router.get("/recommend/matrix-factorization", response_model=list[Car])
async def recommendation_matrix_factorization(current_user: User = Depends(currentUser)):
    user = user_collection.find_one({"_id": current_user["_id"]})
    df = pd.DataFrame(user["ratings_copy"], columns=["index", "make_model","rating"])
    df.drop(columns=["make_model"], inplace=True)
    df.insert(0, "userId", user["sequence"])
    df = df.rename(columns={'index': 'carId'})

    existing_df = pd.read_csv('./data/ratings.csv')
    combined_df = pd.concat([existing_df, df], ignore_index=True)
    combined_df.to_csv('./data/ratings.csv', index=False)

    user["ratings_copy"] = []
    user_collection.update_one({"_id": user["_id"]}, {"$set": {"ratings_copy": user["ratings_copy"]}})

    car_ratings = pd.read_csv('./data/ratings.csv')
    df_p = car_ratings.pivot_table(index='userId', columns='carId', values='rating')

    df = car_ratings
    user_ids = df["userId"].unique().tolist()
    user2user_encoded = {x: i for i, x in enumerate(user_ids)}
    userencoded2user = {i: x for i, x in enumerate(user_ids)}
    car_ids = df["carId"].unique().tolist()
    car2car_encoded = {x: i for i, x in enumerate(car_ids)}
    car_encoded2car = {i: x for i, x in enumerate(car_ids)}
    df["user"] = df["userId"].map(user2user_encoded)
    df["car"] = df["carId"].map(car2car_encoded)

    num_users = len(user2user_encoded)
    num_cars = len(car_encoded2car)

    df = df.sample(frac=1, random_state=42)
    x = df[["user", "car"]].values
    y = df["rating"].apply(lambda x: (x - 0.5) / (4.5)).values

    train_indices = int(0.9 * df.shape[0])

    x_train, x_val, x_test, y_train, y_val, y_test = (
        x[:train_indices],
        x[train_indices:-1000],
        x[-1000:],
        y[:train_indices],
        y[train_indices:-1000],
        y[-1000:],
    )

    embedding_size= 50

    user_id_input = Input(shape=[1], name='user')
    car_id_input = Input(shape=[1], name='car')

    user_embedding = Embedding(output_dim=embedding_size,
                            input_dim=num_users,
                            input_length=1,
                            embeddings_initializer="he_normal",
                            embeddings_regularizer=keras.regularizers.l2(1e-6),
                            name='user_embedding')(user_id_input)
    car_embedding = Embedding(output_dim=embedding_size,
                                input_dim=num_cars,
                                input_length=1,
                                embeddings_initializer="he_normal",
                                embeddings_regularizer=keras.regularizers.l2(1e-6),
                                name='car_embedding')(car_id_input)

    user_vector = Reshape([embedding_size])(user_embedding)
    car_vector = Reshape([embedding_size])(car_embedding)

    concat = Concatenate()([user_vector, car_vector])
    dense1 = Dense(256)(concat)
    dense = Dropout(0.2)(dense1)
    y = Dense(1, activation="sigmoid")(dense)

    model = Model(inputs=[user_id_input, car_id_input], outputs=y)
    model.compile(loss='mse',  optimizer = 'adam')

    history = model.fit(
                x = [x_train[:,0],x_train[:,1]],
                y = y_train,
                batch_size=256,
                epochs=4,
                validation_data = ([x_val[:,0], x_val[:,1]], y_val),
            )

    y_pred = model.predict([x_test[:,0], x_test[:,1]])
    y_true =  y_test
    rmse = np.sqrt(mean_squared_error(y_pred=y_pred, y_true=y_true))
    p , a = (model.predict([x_test[:15,0], x_test[:15,1]]) , y_test[:15])

    car_df = pd.read_csv('./data/final_car_data.csv')
    car_df['carId'] = car_df.index

    cars = []

    def get_recommendations(user_id):
        user_id = int()
        cars_watched_by_user = df[df.userId == user_id]
        cars_not_watched = car_df[
            ~car_df["carId"].isin(cars_watched_by_user.carId.values)]["carId"]
        cars_not_watched = list(
            set(cars_not_watched).intersection(set(car2car_encoded.keys()))
        )
        cars_not_watched = [[car2car_encoded.get(x)] for x in cars_not_watched]
        user_encoder = user2user_encoded.get(user_id)
        user_car_array = np.hstack(
            ([[user_id]] * len(cars_not_watched), cars_not_watched)
        )

        ratings = model.predict([user_car_array[:,0], user_car_array[:,1]]).flatten()

        top_ratings_indices = ratings.argsort()[-6:][::-1]
        recommended_car_ids = [
            car_encoded2car.get(cars_not_watched[x][0]) for x in top_ratings_indices
        ]

        recommended_cars = car_df[car_df["carId"].isin(recommended_car_ids)]
        for row in recommended_cars.itertuples():
            cars.append(row.Index)

    get_recommendations(user["sequence"])

    cars2 = []
    for i in cars:
        car: Car = car_collection.find({"index": i}, {"_id": 0, "index": 1, "make": 1, "model": 1, "make_model": 1, "city_mpg_for_fuel_type1": 1, "co2_fuel_type1": 1, "cylinders": 1, "drive": 1, "annual_fuel_cost_for_fuel_type1": 1, "fuel_type": 1, "id": 1, "transmission": 1, "vehicle_size_class": 1, "year": 1, "atv_type": 1, "electric_motor": 1, "base_model": 1, "image": 1, "price": 1})
        cars2.append(car[0])

    return cars2