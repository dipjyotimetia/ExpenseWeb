FROM node:14.7.0-slim as builder

WORKDIR /webapp
COPY package.json package-lock.json tsconfig.json ./
COPY src src
COPY public public

RUN npm install
RUN npm run build

FROM nginx:1.18-alpine
COPY --from=builder /webapp/build /dist
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]