FROM node:20-alpine3.20 as BUILD_IMAGE

WORKDIR /app

COPY package.json .
COPY prisma .

RUN npm install

COPY . .

FROM node:20-alpine3.20 as PRODUCTION_IMAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app /app

EXPOSE 8080:8080
