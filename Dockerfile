FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./

RUN npm install
COPY . .

ENV PORT=3000
EXPOSE 3000
CMD [ "node", "app.js" ]
