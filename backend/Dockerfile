FROM node:15.7.0-alpine3.12

WORKDIR /backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5002

CMD ["npm", "run", "start"]