# Stage 1 - Build
FROM node:18-alpine AS builder
RUN apk add --no-cache openssl

RUN openssl req -x509 -newkey rsa:4096 \
-keyout key.pem \
-out cert.pem \
-days 365 \
-nodes \
-subj "/CN=localhost"

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
 
COPY --from=builder /app/dist /usr/share/nginx/html
 
COPY cert.pem /etc/nginx/certs/cert.pem
COPY key.pem /etc/nginx/certs/key.pem
 
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80