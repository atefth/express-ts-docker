cp .env.example .env && 
cp .env app/.env && 
cd app && 
npm install && 
cd .. && 
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build && 
docker-compose up -d