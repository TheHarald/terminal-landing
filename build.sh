#!/bin/bash

cd frontend
npm run build
sudo rm -rf /var/www/theharald.ru/html/*
sudo cp -r build/* /var/www/theharald.ru/html/
echo "✅ Готово! Обнови страницу в браузере"