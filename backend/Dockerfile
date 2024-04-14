FROM python:3.9

RUN mkdir /appbackend

WORKDIR /appbackend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . /appbackend

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=80"]