ARG NODE=node
ARG NGINX=nginx
FROM ${NODE} AS builder
WORKDIR /app
COPY . /app
ENV VITE_API_URL=http://39.107.213.168/api
RUN npm config set registry https://registry.npmmirror.com/
RUN npm config get registry
RUN npm install --verbose
RUN npm run build

FROM ${NGINX}
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY nginx-docker/default.conf /etc/nginx/conf.d/default.conf
