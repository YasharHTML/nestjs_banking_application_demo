FROM node:lts-alpine

WORKDIR /app

ARG microservice=gateway

COPY package.json .
COPY dist/apps/${microservice} ./dist/apps/${microservice}

RUN yarn install --prod

ENV APP_MAIN_FILE=dist/apps/${microservice}/main

CMD  node ${APP_MAIN_FILE}