# Building stage
FROM node:14.2-slim as builder
WORKDIR /usr/src/app

ARG GIT_ACCESS_TOKEN_CURL_CONFIG

COPY package*.json ./
COPY preact.config.js ./
COPY src src/
COPY server server/
COPY .babelrc ./

# Curl config
RUN curl -o .env.preproduction https://${GIT_ACCESS_TOKEN_CURL_CONFIG}@raw.githubusercontent.com/KUclap/_ENV/main/env/kuclap-frontend/.env.preproduction

RUN npm ci
RUN npm run build:preprod_prd
RUN npm run build:server
RUN ls -al 

# Starting stage
FROM node:14.2-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules node_modules/
COPY --from=builder /usr/src/app/build build/
COPY --from=builder /usr/src/app/dist dist/
COPY --from=builder /usr/src/app/package.json .
EXPOSE 8088 8088
CMD [ "npm", "run", "start:server-preprod-babel"]