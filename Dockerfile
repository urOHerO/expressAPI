# Используем образ Linux Alpine с версией node 14
FROM node:19.5.0-alpine

# Указываем нашу рабочую директорию
WORKDIR /app

# Копирование package.json и package-lock.json внуть контейнера
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование отстатка приложения в контейнер
COPY . .

# Установка Prisma
RUN npm install -g prisma

# Генерация Prisma client
RUN prisma generate

# Копировние Prisma schema
COPY prisma/schema.prisma ./prisma/

# Открыть порт в контейнере для доступа из вне
EXPOSE 3000

# Запуск сервера
CMD ["npm", "start"]