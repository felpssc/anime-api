FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]