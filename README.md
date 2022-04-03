# ExpressJS RESTful API

## Getting Started

### Install using script (OSX)

1. Clone the repo and cd into repo - `cd express-ts-docker`
2. Allow execute permission to installer - `sudo chmod u+x ./app/scripts/setup/install.sh`
3. Execute the installer - `./app/scripts/setup/install.sh`

### Manual Installation

1. Clone the repo and cd into repo - `cd express-ts-docker`
3. Install package dependencies - `cd app && npm install`
4. Build docker - `cd .. && COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build`
5. Start the container - `docker-compose up -d`

## API Endpoints

### Tasks

Endpoint is `api/v1/tasks` with standard CRUD operations. Routes can be found in `app/src/routes/task.router.ts`.

### TaskLists

Endpoint is `api/v1/taskLists` with standard CRUD operations and additional routes for adding/removing tasks to/from task lists. Routes can be found in `app/src/routes/task.list.router.ts`.

## Tests

All tests can be run by executing `npm run pretest && npm run test` inside `app` dir.

## Development / Debugging

Set `NODE_ENV` in **environemnt** file to `dev`.
Update `app/Dockerfile` at line 13

`CMD [ "npm", "run", "start:prod" ]`
to
`CMD [ "npm", "run", "start:dev" ]`

Rebuild and start container

## Deploy Serverless Lambda Fcuntions

`npm run sls:deploy`