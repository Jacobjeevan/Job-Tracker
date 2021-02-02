FROM node:15.7.0-alpine3.12 as buildstage

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM alpine

WORKDIR /frontend

# Adding bash, in run within container
RUN apk add --no-cache bash

COPY --from=buildstage /frontend/dist .

RUN touch .static

# Uncomment below to run locally with nginx

#FROM nginx

#COPY --from=buildstage /frontend/dist /usr/share/nginx/html