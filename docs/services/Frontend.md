# CMS Frontend

Using [React with Vite](https://vitejs.dev/) as frontend.

## Setup

### NodeJS

Install latest `node` version with [following steps](https://deb.nodesource.com/)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt update -y && sudo apt upgrade -y
sudo npm install -g npm@latest
```
Upgrade to newest version
```
sudo npm update -g
sudo npm install -g n
sudo n latest
```

### Create Vite Project

Create new React Vite project 
```bash
npm create vite@latest
```
- React with Javascript project

### Dependencies

- [Material UI](https://mui.com/) as component provider, easy to use and styling
- [Markdown to JSX](https://www.npmjs.com/package/markdown-to-jsx) to post structure

```bash
npm install react-router-dom
npm i markdown-to-jsx
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
# npm install @tanstack/react-query
```

## Run project

1. First time, is needed to build libraries 
  - `cd frontend/clientapp`
  - `npm install`
2. Run the frontend on dev mode (refreshing on change) `npm run dev` 

## Docker Deploy

[Source](https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa)

1. `vite.config.js` modifications
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 3000, // override default port
    strictPort: true, // exit if port in use
  },
  server: {
    port: 3000, // override default port
    strictPort: true, // exit if port in use
    host: true, // listen 0.0.0.0 (all interfaces)
    origin: "http://0.0.0.0:3000", // defining origin url
  },
})
```
2. Run `npm run build` for production building. It will generate a `/dist` folder
3. To test the build `npm run preview`
4. Create `Dockerfile`
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]
```
5. Build the image `docker build -t appname .`
6. Run the image container `docker run -p 3000:3000 appname`
7. Using `docker-compose` this section is enough
```yaml
services:
  frontend:
    build: ./frontend/clientapp/
    restart: always
    container_name: frontend
    # ports:
    #   - "3000:3000"
    depends_on:
      blog-service:
        condition: service_started
      file-service:
        condition: service_started
    networks:
      - public-subnet
```