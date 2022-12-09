FROM node:16.16.0 as builder
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

# Starting stage
FROM node:16.16.0-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules node_modules/
COPY --from=builder /usr/src/app/.env.preproduction .
COPY --from=builder /usr/src/app/build build/
COPY --from=builder /usr/src/app/dist dist/
COPY --from=builder /usr/src/app/package.json .

EXPOSE 8088 8088

RUN cat .env.preproduction && ls .env.preproduction

CMD [ "npm", "run", "start:server-preprod"]
