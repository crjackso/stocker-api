FROM node:20.11.1-alpine3.18

WORKDIR /app

RUN apk add --update --no-cache python3 py3-pip g++ make

COPY package.json .

RUN yarn
ENV PATH=node_modules/.bin:$PATH

COPY . .

EXPOSE $STOCKER_API_PORT

CMD ["yarn", "start"]
