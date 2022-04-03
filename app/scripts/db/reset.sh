source ./scripts/env.sh

mysql -h $DB_HOST -P $MYSQL_LOCAL_PORT -u $DB_USER -p$DB_PWD < ./db/migrations/000-reset-database.sql
./scripts/db/migrate.sh $DB_HOST $MYSQL_LOCAL_PORT $DB_USER $DB_PWD
./scripts/db/seed.sh $DB_HOST $MYSQL_LOCAL_PORT $DB_USER $DB_PWD

unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)