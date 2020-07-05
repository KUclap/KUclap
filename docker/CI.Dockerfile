FROM node:14.5-alpine as build

WORKDIR /usr/src/app

ARG URL_API
ARG SERVER_PORT
ARG SSR
ENV url_api=${URL_API}
ENV server_port=${SERVER_PORT}
ENV ssr=${SSR}

COPY package*.json ./
COPY *.js ./
COPY src src/
COPY .babelrc ./
RUN printf "${url_api}\n${server_port}\n${ssr}" > .env.production
RUN npm install
RUN ls -al
RUN npm run build:production

COPY build build/

EXPOSE 8000 8000

CMD [ "npm", "start:production"]

# Stage : Production 
FROM nginx:1.17-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 8000 8000
CMD ["nginx", "-g", "daemon off;"]