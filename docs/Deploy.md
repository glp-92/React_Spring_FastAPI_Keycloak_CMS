# Deploy CMS

## Disclaimer

:exclamation: Cybersecurity is a cornerstone of any development. Ensuring the integrity, availability, and security of services, as well as protecting customer and their data, is mandatory. While this repository provides guidelines to reduce the attack surface, it's impossible to guarantee 100% system security. Continuous learning and the implementation of a secure software development lifecycle are highly recommended.

[Ubuntu Server Setup and Hardening](./setup/Ubuntu-Server.md)

[Docker Setup and Hardening](./setup/Docker.md)

[Nginx Setup and Hardening](./setup/Nginx.md)

## Steps to download and run Application

1. Clone repo `git clone https://github.com/glp-92/React_Spring_FastAPI_Keycloak_CMS.git`
2. :warning: `.env` and config files are `gitignored` but `.example.env` files are provided to see the configuration. These files must be renamed and configured as needed (ip, ports...)
    - `./.example.env` => `./.env.production`
    - `./frontend/clientapp/.example.env` => `./frontend/clientapp/.env.production`

    [Info about environment in this project](./setup/Environment.md)
3. Generate `initdb` file for `mysql` setup which will create all users, databases and permissions needed
    - On local computer
    ```bash
    export ENV_FILE=.env.production # change with custom env files
    mkdir ./backend/mysql/initdb
    bash ./backend/mysql/generate_initdb.sh
    ```
    - If using `ssh` on a remote server, for security reasons (visit [ssh hardening section](./setup/Ubuntu-Server.md)) it's recommended to manually create `initdb` file with own `mysql` data that matches `env` file
4. Generate `jar` file from Springboot Blog Service
    ```ssh 
    sudo apt reinstall openjdk-17-jdk # If in a VM for deploy
    cd backend/blog-service
    ./mvnw clean install -DskipTests # with ls a mvnw file should be placed, will test with database so if it's not installed, skip it
    ```
5. Generate `ssl` certificates (currently self-signed)
    ```bash
    cd backend/certs/keycloak
    bash generate_certs.sh
    cd ..
    cd nginx
    bash generate_certs.sh
    ```
6. `docker compose --env-file ./.env.production up --build`
7. Go to browser and check urls `https://localhost` `https://server-ip` ...