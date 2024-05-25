# Stocker API

## Description

Stocker API is a GraphQL API powered by [Nest](https://github.com/nestjs/nest) and is intended to provide financial information.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run Locally

You can run the application via Docker Compose with the following command:

```
docker-compose up -d --build
```

NOTE:  The API is configured to be associated with a Docker network named _stocker_.  As this is an external network (for the time being), you will need to manually create the network.

```
docker network create stocker
```

## Production Environment

You can SSH to the stocker-api EC2 instance with the following command:
```
ssh -i "stocker-api.pem" ec2-user@{STOCKER_API_EC2_IP}
```

## Commands

In a Docker container, the following commands can be run in a terminal:

1. `yarn execute import-dividends`
  This command sources dividend information from [MarketStack](https://marketstack.com/documentation) and persists the data in the local database.

2.  `yarn prisma db seed`
  This command will seed the database with sample financial information.
