source ./scripts/env.sh

mysql -h $DB_HOST -P $MYSQL_LOCAL_PORT -u $DB_USER -p$DB_PWD $database < ./db/seeds/001-tasks.sql
mysql -h $DB_HOST -P $MYSQL_LOCAL_PORT -u $DB_USER -p$DB_PWD $database < ./db/seeds/002-task-lists.sql

unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)