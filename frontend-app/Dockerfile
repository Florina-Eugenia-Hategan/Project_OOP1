# Frontend Dockerfile for React
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
