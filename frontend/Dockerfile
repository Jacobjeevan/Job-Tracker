FROM node:15.7.0-alpine3.12 as buildstage

WORKDIR /frontend

ARG REACT_APP_BACKEND_URL

ARG REACT_APP_MAPBOX_KEY

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV production

RUN echo "REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}" >> .env.prod
RUN echo "REACT_APP_MAPBOX_KEY=${REACT_APP_MAPBOX_KEY}" >> .env.prod

RUN npm run build


FROM node:15.7.0-alpine3.12

EXPOSE 5003

WORKDIR /frontend

# Adding bash, in run within container
RUN apk add --no-cache bash nginx

COPY --from=buildstage /frontend/dist ./dist

COPY --from=buildstage /frontend/package*.json ./

COPY --from=buildstage /frontend/server.js .

RUN npm i express

CMD ["npm", "run", "start"]