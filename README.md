# udacity-build-a-storefront-backend
Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements.

The database schema and and API route information can be found in the (REQUIREMENT.md)

## Installation Instructions:
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

# Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# API Docs
## API intro

Order API.
User API.

The main API is a [REST](http://localhost:3000/api)

## API Endpoint

Link Document for endpoint API: https://documenter.getpostman.com/view/21102224/2s9YkuaJX2

Check out all endpoints in the [REQUIREMENT.md](REQUIREMENTS.md) file. 


## How to setup and connect to the database

Step 1 - Install docker desktop, reference: https://learn.udacity.com/nanodegrees/nd0067/parts/cd0293/lessons/d9c82cc0-f278-4dc6-bb7b-df124967014f/concepts/b4815102-4bc6-40d5-9747-f0cdc1293227

Step 2 - The docker-compose.yml file included in this project should allow you to run a docker container locally if you have Docker installed, open project repository then run `docker-compose up`

Step 3 - Open PostgreSQL terminal, and connect to database as information below:
- Create user
`CREATE USER ${DB_NAME} WITH PASSWORD ${DB_PASSWORD};`

- Create database
`CREATE DATABASE ${DB_NAME};`
`CREATE DATABASE ${DB_NAME_TEST};`

- Grant all database privileges to user in both databases
`GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME TO} ${DB_USER};`
`GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME_TEST} TO ${DB_USER};`

## Setup environment (.env)
TOKEN_SECRET=${YOUR_TOKEN}

POSTGRES_HOST=${DB_HOST}
POSTGRES_DB=${DB_NAME}
POSTGRES_USER=${DB_USER}
POSTGRES_PASSWORD=${DB_PASSWORD}
POSTGRES_PORT=${DB_PORT}
POSTGRES_DB_TEST=${DB_NAME_TEST}
POSTGRES_PORT_TEST=${DB_PORT_TEST}
BCRYPT_PW=${BCRYPT_PW}
SALT_ROUNDS=${SALT_ROUNDS}

## What ports the backend and database are running on

- The database is running on port localhost:${DB_PORT}
- The backend service is running on port 0.0.0.0:3000


## Instructions for installing package and running app

Step 1:  Install all requisite dependencies: `npm i`

Step 2: Run `db-migrate up` to migrate data

Step 3: Run `npm run build` to build project

Step 4: Start API : `npm run start`

Optional: Run `db-migrate down` to drop table

## Instructions for running test
Run the test `npm run test`

