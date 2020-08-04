FROM nginx:1.17-alpine

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
# COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
# RUN mkdir -p /data/nginx
EXPOSE 80 80