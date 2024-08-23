FROM node
COPY . /app
ENV VITE_API_URL=http://192.168.49.2:30020
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --verbose
RUN npm run build

FROM nginx
WORKDIR /app
RUN cp -r ./dist/ /usr/share/nginx/html/
COPY nginx-docker/default.conf /etc/nginx/conf.d/default.conf
