<div align="center">
  <br>
  <h1>Car Recommendation System 🚘</h1>
  <strong>JTP Technical Project by Kunal Chandwani</strong>
</div>

## Description

The Car Recommendation System is a dynamic platform designed to cater to two distinct user groups: practicality seekers and automobile enthusiasts. By leveraging content-based filtering techniques such as Word Embeddings and K-means, along with the collaborative filtering technique Matrix Factorization, it constructs a robust recommendation algorithm. This algorithm, powered by machine learning models, analyzes user input and preferences through a series of tailored questions across various parameters. Whether you prioritize utility or have a passion for automobiles, this system ensures tailored recommendations to suit your needs.

### Table of Contents

- [Description](#description)
- [Installation](#installation)
  - [Launch Project](#a-launch-project)
  - [Script to Populate Database](#b-populate-the-local-database)
  - [Test User Credentials](#c-test-user-credentials)
- [API Documentation](#api-documentation)
- [Working of Recommendation System](#working-of-recommendation-system)
- [Screenshots](#screenshots)
- [Deployed Links](#deployed-links)
- [Tech Stacks](#tech-stacks)
- [References](#references)

## Installation

### A. Launch Project

1. **Open your terminal, and clone the repository to local machine:**

   ```bash
   git clone https://github.com/blackchapel/car-recommendation-system.git
   ```

2. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

3. **Create `.env` file in backend folder and copy contents from [`.env-example`](https://github.com/blackchapel/car-recommendation-system/blob/main/backend/.env-example) to this file.**

   - There are 4 variables in this file. 3 are pre-filled in the `.env-example` file.
   - To generate the `SECRET_KEY`, run following command on your terminal

     ```bash
     openssl rand -hex 32
     ```

   - Paste the generated string as the value of `SECRET_KEY` variable

**NOTE:** Project can be run locally by following either Step 4 or Step 5.

1. **To run project with docker -**

   :warning: Prerequisite - [Docker](https://docs.docker.com/get-docker/) must be installed

   1. **Navigate to root folder (if not already in it):**

      ```bash
      cd ..
      ```

   2. **In the root directory of the project, run**
      ```bash
      docker -compose up
      ```

2. **To run project without docker -**

   1. In the `.env` file created above, replace the value of `MONGODB_URI` variable with the URI of your own MongoDB database

   2. **Navigate to backend folder (if not already in it):**

      ```bash
      cd backend
      ```

   3. **Run the following commands in this terminal:**

      :warning: Prerequisite - [Python3](https://www.python.org/downloads/) version must be 3.9

      ```python
      python3 -m venv env
      ```

      ```python
      source env/bin/activate
      ```

      ```python
      pip install -r requirements.txt
      ```

      ```python
      uvicorn main:app
      ```

      Backend server is now running in this terminal

   4. **Open a new terminal**

   5. **Navigate to frontend folder in this new terminal:**

      ```bash
      cd frontend
      ```

   6. **Run the following commands in this terminal:**

      ```bash
      npm install <or> yarn install
      ```

      ```bash
      npm start <or> yarn start
      ```

      Frontend server is now running in this terminal

3. **Once the docker container/local servers are running -**
   - Frontend will be available on [localhost:3000](http://localhost:3000)
   - Backend will be available on [localhost:80](http://localhost:80)
   - Database will be available
     - with Docker: through `mongodb://localhost:27017/`
     - without Docker: on URI entered in step 5.1

### B. Populate the local database

1. Once the project is running, open your web browser and enter the following URL: [Population link](http://localhost:80/api/populate/database)
2. Hit the API endpoint
3. The local database will now be populated with the required data

### C. Test User Credentials

- **Username:** johndoe
- **Password:** pass@123

## API Documentation

The documentation for APIs created for this application using FastAPI will be available at the following:

- **Online:** [car-recommendation-backend.onrender.com/docs](https://car-recommendation-backend.onrender.com/docs)
- **Local:** [localhost/docs](http://localhost:80/docs) when running locally

## Working of Recommendation System

The recommendation system operates through a multi-step process to provide personalized vehicle suggestions:

1. **Data Preprocessing:**
   The raw dataset, sourced from the all-vehicles-model dataset, undergoes preprocessing to ensure quality and relevance. This includes filling missing values, dropping unnecessary columns, removing duplicates, encoding categorical variables, scaling numerical features and enriching each entry with additional information such as images and prices. These steps enhance the dataset's completeness and accuracy, laying the groundwork for effective recommendation modeling.

2. **Word Embeddings:**
   Utilizing Word Embeddings through the Word2Vec algorithm, textual data related to vehicles such as descriptions, specifications, and user reviews are transformed into high-dimensional vectors. Each word is represented as a 100-dimensional vector, capturing semantic relationships between words and enabling the system to understand the context of vehicle attributes and enhance recommendation accuracy.

3. **K-means Clustering:**
   K-means clustering is employed to group vehicles with similar features into clusters. Prior to clustering, the vehicle attributes derived from Word Embeddings are normalized to ensure that all features contribute equally to the clustering process. By analyzing the normalized vehicle attributes, K-means helps identify patterns and similarities among vehicles. This enables the system to recommend vehicles that belong to the same cluster as those preferred by the user. K-means clustering is utilized both to recommend similar cars when a user is viewing car details and after answering the short questionnaire, ensuring relevant and diverse recommendations.

4. **Matrix Factorization:**
   Matrix Factorization is utilized as a collaborative filtering technique to personalize recommendations based on user interactions. If a user has provided ratings to different vehicles, Matrix Factorization identifies latent factors underlying user preferences and vehicle characteristics. By decomposing the user-item interaction matrix, Matrix Factorization captures hidden patterns in user behavior and generates recommendations tailored to individual preferences as well as based on similarities with other users.

![Image Alt text](/assets/flowchart3.png "Working Flowchart")

For detailed implementation and code, refer to the ipynb [file](https://github.com/blackchapel/car-recommendation-system/blob/main/backend/ml/models.ipynb) available in the repository. The code is also accessible [here](https://colab.research.google.com/drive/1TFqACz4WgLerQOL3mYGVlSD2LlttTR5y?usp=sharing).

## Screenshots

Home Page -
![Image Alt text](/assets/homepage.png "Home Page")

Search -
![Image Alt text](/assets/homepage-search.png "Search")

Car Details -
![Image Alt text](/assets/car-details.png "Car Details")

Cars similar to above -
![Image Alt text](/assets/similar-cars.png "Similar Cars")

Mini Questionnaire -
![Image Alt text](/assets/mini-questionnaire.png "Mini Questionnaire")

Recommended Cars based on questionnaire -
![Image Alt text](/assets/recommended-cars.png "Recommended Cars")

My Profile -
![Image Alt text](/assets/my-profile.png "My Profile")

## Deployed Links

The application is hosted on the following links, if unable to run locally.

- **Frontend:** https://car-recommendation.vercel.app/
- **Backend:** https://car-recommendation-backend.onrender.com/api

**NOTE:** Recommend to run the application locally. Above website may be slow since the application is hosted on free tier.

## Tech Stacks

- **Frontend**

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

- **Backend**

  ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

- **Database:**

  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

- **Deployment:**

  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## References

📄 **Dataset:** [All Vehicles Model Dataset](https://public.opendatasoft.com/explore/dataset/all-vehicles-model/)

The All Vehicles Model Dataset provides information on various vehicles, including electric vehicles (EVs), plug-in hybrid electric vehicles (PHEVs), car models, makes, fuel consumption, and CO2 emissions. The dataset is provided by the Environmental Protection Agency and is available in the public domain.

- **Dataset Identifier:** all-vehicles-model
- **Keywords:** Vehicle, Motor, EV, PHEV, Car, Model, Make, Consumption, CO2
- **License:** Public domain
- **Publisher:** Environmental Protection Agency
- **Reference:** [Fuel Economy Website](https://www.fueleconomy.gov/feg/download.shtml)

---

[⬆ Back to Top](#description)
