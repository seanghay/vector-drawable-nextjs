FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]