FROM node:15.7.0-alpine3.12 as buildstage

WORKDIR /backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]