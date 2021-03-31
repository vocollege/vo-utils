#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source ${SCRIPT_DIR}/../.env

# Install Laravel with Artisan.
echo "### Recreate database tables and initial data..."
EXEC_PHP="docker-compose -f ${DIR}/docker-compose.yml exec php sh -c"
${EXEC_PHP} "php artisan migrate:fresh"
${EXEC_PHP} "php artisan key:generate"
${EXEC_PHP} "php artisan passport:install --force"
${EXEC_PHP} "php artisan db:seed"
