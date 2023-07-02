FROM node:lts-alpine

WORKDIR /app

ARG microservice=gateway

COPY package.json .
COPY dist/apps/${microservice} ./dist/apps/${microservice}

RUN yarn install --prod

RUN ls -Rax dist

CMD [ "node", "./dist/apps/${microservice}/main" ]