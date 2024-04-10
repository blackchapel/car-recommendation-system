FROM node:21

RUN mkdir /app

WORKDIR /app

COPY package.json .

ARG NODE_ENV

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["node", "./src/index.js"]