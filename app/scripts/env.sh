if [ ! -f /.env ]
then
  export $(grep -v '^#' .env | xargs -0)
  database=${DB_NAME}_${NODE_ENV}
fi