# Étape 1 : Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serve avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/production-frontend/browser /usr/share/nginx/html
EXPOSE 80