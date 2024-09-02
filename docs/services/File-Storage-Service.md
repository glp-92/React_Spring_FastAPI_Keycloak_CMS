# File Storage Service

Served with `FastAPI`, provides an easy way to setup a file server

## Setup

### On current System

[Anaconda](https://www.anaconda.com/) is strongly recommended to setup `Python` environments

1. Activate an environment
```bash
conda activate envname # (if anaconda)
source ./backend/filestorage-service/env/bin/activate # (if virtualenv)
```
2. Install requirements
```bash
cd backend/filestorage-service
pip install -r requirements.txt
```
3. Run APP
```bash
cd app
uvicorn main:app --port 8000 --host 0.0.0.0
```

### On Docker

A `Dockerfile` is provided and install everything needed

1. Run `docker-compose` with all the services
```bash
docker compose up --build
```