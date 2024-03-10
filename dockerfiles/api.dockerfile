FROM node:20.11.1-alpine3.18

WORKDIR /app

COPY package.json .

RUN yarn
ENV PATH=node_modules/.bin:$PATH

COPY . .

EXPOSE $STOCKER_API_PORT

CMD ["yarn", "start"]
