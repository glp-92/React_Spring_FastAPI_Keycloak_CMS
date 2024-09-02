# MySQL

## Setup

### On current System

1. Install `mysql` on system, `docker` has already available images.
```bash
sudo apt install mysql-server -y
sudo systemctl enable mysql.service
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpwd';
mysql -u root -p
```
2. Setup all the databases manually
```sql
CREATE USER IF NOT EXISTS 'mysqlusr'@'%' IDENTIFIED WITH 'caching_sha2_password' BY 'mysqlpwd';
CREATE USER IF NOT EXISTS 'keycloak_usr'@'%' IDENTIFIED WITH 'caching_sha2_password' BY 'keycloak_pwd';
CREATE DATABASE IF NOT EXISTS keycloak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak_usr'@'%';
CREATE USER IF NOT EXISTS 'blog'@'%' IDENTIFIED WITH 'caching_sha2_password' BY 'blogservice_pwd';
CREATE DATABASE IF NOT EXISTS blog_service;
GRANT ALL PRIVILEGES ON blog_service.* TO 'blog'@'%';
FLUSH PRIVILEGES;
```

### On Docker

1. To create automatically databases and users for the `docker compose` command, is needed to run `generate_initdb.sh`
```bash
export ENV_FILE=.env.development # change with custom env files
mkdir ./backend/mysql/initdb
bash ./backend/mysql/generate_initdb.sh
```