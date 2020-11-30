# Building stage
FROM node:14.2 as builder
WORKDIR /usr/src/app

ARG GIT_ACCESS_TOKEN_CURL_CONFIG

COPY package*.json ./
COPY preact.config.js ./
COPY src src/
COPY server server/
COPY .babelrc ./

# Curl config
RUN curl -o .env.production https://${GIT_ACCESS_TOKEN_CURL_CONFIG}@raw.githubusercontent.com/KUclap/_ENV/main/env/kuclap-frontend/.env.production

RUN npm ci
RUN npm run build:prod_prd
RUN npm run build:server
RUN ls -al 

# Starting stage
FROM node:14.2-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules node_modules/
COPY --from=builder /usr/src/app/.env.* .
COPY --from=builder /usr/src/app/build build/
COPY --from=builder /usr/src/app/dist dist/
COPY --from=builder /usr/src/app/package.json .
EXPOSE 8000 8000
CMD [ "npm", "run", "start:server-prod"]

# # Building stage
# FROM node:14.2-slim as builder
# WORKDIR /usr/src/app

# ARG URL_API
# ARG SERVER_PORT
# ARG SSR

# COPY package.json ./
# COPY *.js ./
# COPY src src/
# COPY .babelrc ./
# RUN printf "URL_API=\"$URL_API\"\nSERVER_PORT=$SERVER_PORT\nSSR=$SSR\n" > .env.production
# RUN npm install
# RUN npm run build:prod_prd

# # Starting stage
# FROM node:14.2-slim
# WORKDIR /usr/src/app
# COPY --from=builder /usr/src/app/ .
# RUN ls -al
# EXPOSE 8000 8000
# CMD [ "npm", "run", "start:prod"]