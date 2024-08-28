# React Spring FastAPI Keycloak CMS

CMS from scratch using 
  - [React with Vite](https://vitejs.dev/) as frontend
  - [Java Springboot](https://spring.io/projects/spring-boot) as blog service (posts, categories...)
  - [Python with FastAPI](https://fastapi.tiangolo.com/) as static file retrieve service (serving images, videos...)
  - [MySQL database](https://www.mysql.com/)
  - Deployed with [Docker](https://www.docker.com/)

:warning: `.env` and `config files` files are `gitignored` but `.example.env` files are provided to see the configuration. These files must be renamed and configured as needed (ip, ports...)
  - `./.example.env` => `./.env`
  - `./frontend/clientapp/.example.env` => `./frontend/clientapp/.env.production`