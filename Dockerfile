# Стадия сборки React-приложения
FROM node:19-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Стадия запуска с Nginx
FROM nginx:alpine
# Копируем собранное приложение в папку Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Копируем наш конфигурационный файл для Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80