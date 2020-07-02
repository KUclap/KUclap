FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run build:production
COPY . .

EXPOSE 8000 8000

CMD [ "npm", "start"]