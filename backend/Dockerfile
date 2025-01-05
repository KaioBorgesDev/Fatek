FROM node:22.5-alpine

WORKDIR /usr/app

COPY package*.json ./ 

RUN npm install

COPY . .  
ENV NODE_ENV=prod

ENV MONGO_URI_PROD=mongodb://mongo-fatek:27017/fatek

CMD ["npm", "run", "dev"]

EXPOSE 5002
