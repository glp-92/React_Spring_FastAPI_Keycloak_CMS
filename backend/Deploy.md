# Deploy Backend

Backend runs with `MySQL` database for `Keycloak` and `blog-service`

## Blog service to Docker

1. Generate `jar` file from the application that will be placed on `./target`
```bash
sudo apt reinstall openjdk-17-jdk # If in a VM for deploy
cd backend/blog-service
./mvnw clean install -DskipTests # with ls a mvnw file should be placed, will test with database so if it's not installed, skip it
```
2. Dockerfile to build the image
```dockerfile
FROM openjdk:17-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring # Using user different from root
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```