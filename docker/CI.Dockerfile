FROM node:14.5-slim as build

WORKDIR /usr/src/app

ARG URL_API
ARG SERVER_PORT
ARG SSR
# ENV url_api=$URL_API
# ENV server_port=$SERVER_PORT
# ENV ssr=$SSR

COPY package*.json ./
COPY *.js ./
COPY src src/
COPY .babelrc ./
COPY *.conf ./
RUN printf "$URL_API\n$SERVER_PORT\n$SSR\n" > .env.production
RUN npm install -g preact-cli
RUN npm install

RUN npm run build:production

EXPOSE 8000 8000

CMD [ "npm", "start:production"]

# Stage : Production 
FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80 80
CMD ["nginx", "-g", "daemon off;"]