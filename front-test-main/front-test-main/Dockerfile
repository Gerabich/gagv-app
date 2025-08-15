# ---- Build Angular ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Nginx Static ----
FROM nginx:alpine
# Config SPA + proxy /api -> api:3000
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiar build
COPY --from=builder /app/dist/ammo-app /usr/share/nginx/html
EXPOSE 80
