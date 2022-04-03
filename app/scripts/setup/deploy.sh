npm run build &&
cp serverless.yml dist/serverless.yml && 
cp .env dist/.env && 
cp -r node_modules dist/ && 
cd dist && 
sls deploy