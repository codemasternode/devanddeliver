ARG NODE_PORT

FROM node:14.15.1-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $NODE_PORT

CMD ["npm", "run dev"]