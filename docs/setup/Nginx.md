# Setup

Nginx is currently used with `Docker` using `alpine` image

```yaml
nginx:
    image: nginx:1.27.1-alpine
    restart: always
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./backend/reverse-proxy/nginx.conf:/etc/nginx/nginx.conf # Nginx config
      - ./backend/certs/nginx:/etc/nginx/certs # Nginx certs
    depends_on:
      frontend:
        condition: service_started
    networks:
      - public-subnet
```

Configuration is placed [here](/backend/reverse-proxy/nginx.conf)

# Hardening

## Permissions

1. Only read permission to group and propietary user of `.conf` => `chmod 440 /etc/nginx/nginx.conf`

## On Configuration File

1. Disable version number reveal
```
http {
    server_tokens off; 
    ...
}
```
2. `HTTPS` and `HTTPS` redirect. `TLS1.2` or higher
  - Enforce `http2` which improves performance and security
  - List `ssl cyphers` and allow client to select cypher for better performance
  - Set the path of `.crt` and `.key` for `ssl` certs
```
server {
    listen 80;
    http2  on;
    # server_name www.example.com;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    http2  on;
    # server_name www.example.com;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_certificate /etc/nginx/certs/nginx.crt;
    ssl_certificate_key /etc/nginx/certs/nginx.key;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305;
        ssl_prefer_server_ciphers off;
    ...
}
```
3. Rate limit. 
  - rate => number of request per second (s) or minute (m)
  - zone=zonename:10m => zone stores state of each IP. 16000 IP's about 1m
  - burst => requests a client can make in excess of rate specified. Deleting burst fixes limit
```
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login_limit:10m rate=2r/s;

    server {
        location / {
            limit_req zone=mylimit burst=20 nodelay;
        }
        location /blog/login {
            limit_req zone=login_limit nodelay;
        }
    }
}
```
4. Security headers
  - Don't allow render page on iframes
    ```
    http {
        add_header X-Frame-Options SAMEORIGIN;
        ...
    }
    ```
  - Don't allow the browser mime-type sniffing
    ```
    http {
        add_header X-Content-Type-Options "nosniff";
        ...
    }
    ```
  - XSS filter
    ```
    http {
        add_header X-XSS-Protection "1; mode=block";
        ...
    }
    ```
  - Header to require https to browser (HSTS)
    ```
    http {
        add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";
        ...
    }
    ```
5. Allow only required methods. For example:
```
http {
    server {
        location /static {
            limit_except GET {
                deny all;
            }
            ...
        }
    }
}
```