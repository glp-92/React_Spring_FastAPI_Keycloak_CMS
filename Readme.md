# React Spring Keycloak CMS

:warning: This branch works as testing branch, do not use this code in production. Production code is in `main` branch which has some security improvements

- Single entrypoint with `Nginx`
- `Keycloak` production mode, optimized for VPS with low resource (start-dev throws 404 error ocasionally)
- Instructions for `Ubuntu Server` hardening, `Docker` hardening and `Nginx` hardening

[Frontend Docs](/frontend/Readme.md)

[Backend Docs](/backend/Readme.md)

## Run / Stop App

To run App, development `env` file must be chosen (copy `.example.env` file)

[Info about environment in this project](./docs/Environment.md)

`sudo docker compose --env-file ./.env.development up`

To stop App

`sudo docker compose --env-file ./.env.development down`