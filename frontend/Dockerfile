FROM node:15.7.0-alpine3.12 as buildstage

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:15.7.0-alpine3.12

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY --from=buildstage /frontend/dist ./public
