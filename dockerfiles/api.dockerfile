FROM node:21.2.0-alpine3.17

WORKDIR /app

COPY package.json .

RUN yarn
ENV PATH=node_modules/.bin:$PATH

COPY . .

EXPOSE $STOCKER_API_PORT

CMD ["yarn", "start"]
