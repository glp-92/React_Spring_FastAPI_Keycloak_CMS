# FullStack CMS

CMS from scratch using 
  - [Nginx](https://nginx.org/en/) as reverse proxy
  - [React with Vite](https://vitejs.dev/) as frontend
  - [Java Springboot](https://spring.io/projects/spring-boot) as blog service (posts, categories...)
  - [Python with FastAPI](https://fastapi.tiangolo.com/) as static file retrieve service (serving images, videos...)
  - [Keycloak](https://www.keycloak.org/) as identity server
  - [MySQL database](https://www.mysql.com/)
  - Deployed with [Docker](https://www.docker.com/)

## App Design

Documents for project design are the following

[SQL Database Design and Spring annotations](./docs/design/DB-Design.md)

[System Design with Architecture Diagram](./docs/design/System-Design.md)

## Deploy App

Visit [Deploy Guide](./docs/Deploy.md) to setup and run server instance. Tested on `Ubuntu 22.04 Desktop` and `Ubuntu 22.04 Server`
