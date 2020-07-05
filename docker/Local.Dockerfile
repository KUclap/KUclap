FROM node:14.5-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY *.js ./
COPY src src/
COPY .env* ./
COPY .babelrc ./
RUN npm install
RUN npm run build:production
COPY build build/

EXPOSE 8000 8000

CMD [ "npm", "start:production"]

# Stage : Production 
FROM nginx:1.17-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 8000 8000
CMD ["nginx", "-g", "daemon off;"]
