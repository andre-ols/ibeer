FROM node:20.0.0 AS base

FROM base as development
WORKDIR /usr/app

COPY package*.json ./
COPY assets ./assets
COPY prisma ./prisma
COPY src ./src
COPY .env ./
COPY tsconfig.json ./
COPY nodemon.json ./
RUN npm install
RUN npx prisma generate
