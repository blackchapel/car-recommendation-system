FROM node:21

RUN mkdir /appfrontend

WORKDIR /appfrontend

COPY package.json .

RUN npm install

COPY . /appfrontend

EXPOSE 3000

CMD ["node", "./src/index.js"]