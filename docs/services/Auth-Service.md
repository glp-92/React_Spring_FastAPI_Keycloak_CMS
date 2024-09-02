## Keycloak OAuthServer

### Setup

For application identity management, realm, client, user and roles are needed.

1. Run Keycloak container 
```bash
sudo docker compose up
```
2. `http:localhost:8080/admin` to open admin console (usr and password provided on compose secret)
3. Build new realm `blog`
4. Go to clients section and create new client `blog-client`. All by default but `Client Authentication` ON and `Valid redirect URIs` *
5. Create new User `username` and confirm email. Maybe first name and last name are required by Keycloak to successful login.
6. To create `ADMIN` role, on created client section, tab `Roles` `Create role`. Set name to `ADMIN`
7. Map role to user. `Users` => select user => `Role mapping` => `Assign role` => `Filter by clients` => Select `ADMIN` role
8. Must provide client secret to backend. `Clients` => `blog-client` => `Credentials` => `Client Secret`
9. Login user `http://localhost:8080/realms/blog/account`

Specify OAuth2 config on Spring Boot App properties.yaml
```yaml
spring:
  security: 
    oauth2: 
      resourceserver:  
        jwt:  
          issuer-uri: http://localhost:8080/realms/blog
          jwk-set-uri: ${spring.security.oauth2.resourceserver.jwt.issuer-uri}/protocol/openid-connect/certs
          token-uri: ${spring.security.oauth2.resourceserver.jwt.issuer-uri}/protocol/openid-connect/token
          revoke-token-uri: ${spring.security.oauth2.resourceserver.jwt.issuer-uri}/protocol/openid-connect/logout
          client-secret: secret provided on 8 step
jwt:  
  auth:  
    converter: 
      resource-id: blog-client
      principal-attribute: principal_username
```

### Alternative importing existing Realm Data

Keycloak can import an existing realm configuration on `.json` format. [Example of cfg](./../backend/auth-service/blog-realm-example.json)

To export an existing realm config, on Keycloak Admin Console

1. Go to selected Realm.
2. Click Realm Settings
3. Click Action => Partial Export => Select what needed

With this method, users are not exported. To add them to exported file

1. `docker ps` to locate container running Keycloak
2. `sudo docker exec -it containerId /bin/bash`
3. `opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data --realm realmName --users realm_file`
4. `cd opt/keycloak/data/`
5. `ls` and choose file according to export
6. `cat filename.json | grep -n "username"` will be easier getting lines where a searched user is placed
7. `cat filename.json` and copy "users" list section that contains users grepped before
8. Add the "users" section to `json` file

To import all Realm Data on `Docker-compose` a volume can be shared so Keycloak, on boot, will try to import `json` files that are placed into that folder with `--import-realm` flag

```yaml 
keycloak:
    image: quay.io/keycloak/keycloak:latest
    command: start-dev --proxy-headers forwarded --import-realm
    volumes:
      - ./backend/auth-service/:/opt/keycloak/data/import
```

### Postman auth endpoint testing

- Get JWT Token
  - POST `http://localhost:8080/realms/realmName/protocol/openid-connect/token` Body `x-www-form-urlencoded`
  - grant_type: password
  - client_id: clientName
  - username: userName
  - password: userPassword
  - client_secret: clientSecret
  
### MFA With authenticator

1. Select blog realm => Authentication => Required Actions => Configure OTP => Enabled ON / Set as default Action ON
2. Policies tab => OTP Policy => Configure custom OTP settings (preferred low expiration time)
3. Users => Select user => Required Actions => Configure OTP

Once configure checked, must login with Keycloak at `http://localhost:8080/realms/blog/account`

4. Download Microsoft / Google authenticator and scan QR provided by login page
5. OTP must be included on login form as:
  - topt: otpKey