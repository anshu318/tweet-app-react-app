FROM node:14.16.1-alpine

RUN mkdir -p /opt/tweetapp-client
WORKDIR /opt/tweetapp-client

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
