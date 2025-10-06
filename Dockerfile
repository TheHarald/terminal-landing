# Этап сборки
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап запуска
FROM nginx:alpine

# Копируем собственный конфигурационный файл
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное React-приложение
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]