source ./scripts/env.sh

mysql -h $DB_HOST -P $MYSQL_LOCAL_PORT -u $DB_USER -p$DB_PWD $database < ./db/migrations/001-create-tasks-table.sql
mysql -h $DB_HOST -P $MYSQL_LOCAL_PORT -u $DB_USER -p$DB_PWD $database < ./db/migrations/002-create-task-lists-table.sql
mysql -h $DB_HOST -P $MYSQL_LOCAL_PORT -u $DB_USER -p$DB_PWD $database < ./db/migrations/003-create-tasks-task-lists-join-table.sql

unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)