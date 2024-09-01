# React Vite Frontend

## Setup

### NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - # visit deb.nodesource.com if not sure about last version
sudo apt-get install -y nodejs
sudo apt update -y && sudo apt upgrade -y
sudo npm install -g npm@latest
```
Update to newest version
```
sudo npm update -g
sudo npm install -g n
sudo n latest
```
Create new React Vite project 
```
npm create vite@latest
```

### Dependencies
```
npm install react-router-dom
npm i markdown-to-jsx
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @fontsource-variable/roboto-mono
npm install @tanstack/react-query
```

## Run project
1. First time, is needed to build libraries 
  - `cd frontend/clientapp`
  - `npm install`
2. Run the frontend on dev mode (refreshing on change) `npm run dev` 

## Docker deployment

[Source](https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa)

1. Vite configuration modifications
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 3000,
    strictPort: true, # exit if port in use
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true, # listen 0.0.0.0 (all interfaces)
    origin: "http://0.0.0.0:3000", # defining origin url
  },
})
```
2. Create `Dockerfile`
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
```
3. Build the image `docker build -t appname .`
4. Run the image container `docker run -p 3000:3000 appname`
5. Using `docker-compose` this section is enough
```yaml
services:
  frontend:
    build: ./frontend/clientapp/
    restart: always
    container_name: frontend
    ports:
      - "3000:3000"
```