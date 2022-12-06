FROM node:16.3.0-alpine
WORKDIR /app
COPY package.json /app
RUN npm install     
COPY . .
EXPOSE 5001
CMD  ["npm","run","serve"]