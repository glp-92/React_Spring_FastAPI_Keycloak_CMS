# CMS Backend

Implemented with Spring Boot, FastAPI, Spring Security and Keycloak. Currently using `MySQL` for Spring Boot and Keycloak

## Setup Keycloak 0Auth2Server

For the application, realm, client, user and roles are needed.

1. Run Keycloak container 
```
cd auth-service
sudo docker compose up
```
2. `http:localhost:9000/admin` to open admin console (usr and password provided on compose secret)
3. Build new realm `blog`
4. Go to clients section and create new client `blog-client`. All by default but `Client Authentication` ON and `Valid redirect URIs` *
5. Create new User `username` and confirm email. Maybe first name and last name are required by Keycloak to successful login.
6. To create `ADMIN` role, on created client section, tab `Roles` `Create role`. Set name to `ADMIN`
7. Map role to user. `Users` => select user => `Role mapping` => `Assign role` => `Filter by clients` => Select `ADMIN` role
8. Must provide client secret to backend. `Clients` => `blog-client` => `Credentials` => `Client Secret`
9. Login user `http://localhost:9000/realms/blog/account`

Specify OAuth2 config on Spring Boot App properties.yaml
```
spring:
  security: 
    oauth2: 
      resourceserver:  
        jwt:  
          issuer-uri: http://localhost:9000/realms/blog
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

## Blog Service

On `pom.xml` dependencies are specified

If using `Eclipse IDE` `boot dashboard` is useful to launch server. Go to Eclipse marketplace and install `Spring Tools 4`. Once installed `Window` => `Show view` => `Other` => `Boot Dashboard`

## Java VM
```
sudo apt reinstall openjdk-17-jd
```

**By default, Lombok is not installed for Eclipse**

1. Download .jar `https://projectlombok.org/download`
2. Run `java -jar lombok.jar`
3. Specify Eclipse install location, example `/home/user/eclipse/java-2023-12/eclipse`
4. `Install/Update`

## MySQL

Spring Boot backend currently uses MySQL database for data persisting.

Install, create DB and USER.
```
sudo apt install mysql-server -y
sudo systemctl enable mysql.service
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpwd';
mysql -u root -p
CREATE USER 'blog'@'localhost' IDENTIFIED BY 'blogpwd'
CREATE DATABASE blog_service;'
GRANT ALL PRIVILEGES ON blog_service.* TO 'blog'@'localhost';
```

## Postman auth endpoint testing

- Get JWT Token
  - POST `http://localhost:9000/realms/realmName/protocol/openid-connect/token` Body `x-www-form-urlencoded`
  - grant_type: password
  - client_id: clientName
  - username: userName
  - password: userPassword
  - client_secret: clientSecret
  
## MFA With authenticator

1. Select blog realm => Authentication => Required Actions => Configure OTP => Enabled ON / Set as default Action ON
2. Policies tab => OTP Policy => Configure custom OTP settings (preferred low expiration time)
3. Users => Select user => Required Actions => Configure OTP

Once configure checked, must login with Keycloak at `http://localhost:9000/realms/blog/account`

4. Download Microsoft / Google authenticator and scan QR provided by login page
5. OTP must be included on login form as:
  - topt: otpKey
  
## References and useful links

https://snyk.io/blog/guide-to-input-validation-with-spring-boot/
