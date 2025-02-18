FROM node:23-alpine as builder
RUN mkdir -p /usr/src/next-nginx
WORKDIR /usr/src/next-nginx
COPY package*.json /usr/src/next-nginx/
RUN npm install
COPY . .
RUN npx next build
RUN npx next export

FROM nginx:1.27.4-alpine as production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/next-nginx/out/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]