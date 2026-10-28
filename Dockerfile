# Tahap 1: Build Frontend (React/Vite)
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap 2: Install Backend (Composer/Laravel)
FROM composer:2 AS vendor
WORKDIR /app
COPY database/ database/
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --no-progress --prefer-dist
COPY . .
RUN composer dump-autoload --optimize

# Tahap 3: Gabungkan semuanya di server PHP
FROM php:8.2-cli-alpine
WORKDIR /app

# Install ekstensi PHP yang dibutuhkan Laravel & PostgreSQL
RUN apk add --no-cache libpng-dev libzip-dev zip unzip postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql gd zip

# Copy hasil build dari tahap sebelumnya
COPY --from=vendor /app /app
COPY --from=frontend /app/public/build /app/public/build

# Atur permission untuk folder storage dan cache Laravel
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Jalankan server Laravel
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
