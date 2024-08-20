FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx-docker/default.conf /etc/nginx/conf.d/default.conf