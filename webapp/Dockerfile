FROM node:15.7.0-alpine3.11
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENTRYPOINT ["npm", "run", "dev"]