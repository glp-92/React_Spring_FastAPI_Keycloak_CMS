#!/bin/bash
# source .env
# mkdir ./backend/mysql/initdb
# bash ./backend/mysql/generate_initdb.sh

cat <<EOF > ./backend/mysql/initdb/init.sql
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED WITH 'caching_sha2_password' BY '${MYSQL_PASSWORD}';
CREATE USER IF NOT EXISTS '${KEYCLOAK_MYSQL_USER}'@'%' IDENTIFIED WITH 'caching_sha2_password' BY '${KEYCLOAK_MYSQL_PASSWORD}';
CREATE DATABASE IF NOT EXISTS ${KEYCLOAK_DATABASE} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON keycloak.* TO '${KEYCLOAK_MYSQL_USER}'@'%';

CREATE USER IF NOT EXISTS '${MYSQL_BLOG_SERVICE_USER}'@'%' IDENTIFIED WITH 'caching_sha2_password' BY '${MYSQL_BLOG_SERVICE_PASSWORD}';
CREATE DATABASE IF NOT EXISTS ${MYSQL_BLOG_DB_NAME};
GRANT ALL PRIVILEGES ON blog_service.* TO '${MYSQL_BLOG_SERVICE_USER}'@'%';

FLUSH PRIVILEGES;
EOF