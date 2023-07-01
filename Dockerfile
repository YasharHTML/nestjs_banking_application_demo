FROM node:lts-alpine

WORKDIR /app

ARG microservice=gateway

COPY package.json .
COPY dist/apps/${microservice} ./dist/apps/${microservice}

RUN yarn install --prod

CMD [ "node", "dist/apps/${microservice}/main" ]