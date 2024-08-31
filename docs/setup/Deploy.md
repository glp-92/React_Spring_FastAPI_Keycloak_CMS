# Deploy CMS

1. Clone repo `git clone https://github.com/glp-92/React_Spring_FastAPI_Keycloak_CMS.git`
2. :warning: `.env` and `config files` files are `gitignored` but `.example.env` files are provided to see the configuration. These files must be renamed and configured as needed (ip, ports...)
    - `./.example.env` => `./.env.production`
    - `./frontend/clientapp/.example.env` => `./frontend/clientapp/.env.production`
3. Generate `initdb` file for `mysql` setup which will create all users, databases and permissions needed
    - On local computer
    ```bash
    export ENV_FILE=.env.production # change with custom env files
    mkdir ./backend/mysql/initdb
    bash ./backend/mysql/generate_initdb.sh
    ```
    - If using `ssh` on a remote server, for security reasons (visit [ssh hardening section](./Ubuntu-Server.md)) it's recommended to manually create `initdb` file with own `mysql` data that matches `env` file
4. Generate `jar` file from Springboot Blog Service
    ```ssh 
    sudo apt reinstall openjdk-17-jdk # If in a VM for deploy
    cd backend/blog-service
    ./mvnw clean install -DskipTests # with ls a mvnw file should be placed, will test with database so if it's not installed, skip it
    ```
5. Generate  `ssl` certificates (currently self-signed)
    ```bash
    cd backend/certs/keycloak
    bash generate_certs.sh
    cd ..
    cd nginx
    bash generate_certs.sh
    ```