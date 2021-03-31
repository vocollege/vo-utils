#!/bin/bash

clear

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source ${SCRIPT_DIR}/../.env

echo "### Creating new Laravel environment file..."
cp ${APP_DIR}/.env.example ${APP_DIR}/.env

EXEC_POSTGRES="docker-compose -f ${DIR}/docker-compose.yml exec postgres sh -c"

# Recreate database.
echo "### Recreating database..."
${EXEC_POSTGRES} "dropdb -U vocollege vocollege_app_dev"
${EXEC_POSTGRES} "createdb -U vocollege vocollege_app_dev"
# ${EXEC_POSTGRES} "CREATE EXTENSION postgis"

# Update composer dependencies.
echo "### Installing php dependencies..."
docker-compose -f ${DIR}/docker-compose.yml run --rm composer install

# Install Laravel with Artisan.
${SCRIPT_DIR}/recreate-database.sh