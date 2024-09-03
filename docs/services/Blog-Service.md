# Blog Service

## Setup

### On current System

1. On `pom.xml` dependencies are already specified
2. If using `Eclipse IDE` `boot dashboard` is useful to launch server. Go to Eclipse marketplace and install `Spring Tools 4`. Once installed `Window` => `Show view` => `Other` => `Boot Dashboard`
3. Install `Java JDK`
```bash
sudo apt reinstall openjdk-17-jdk
```
3. `Project Lombok` is not installed in Eclipse
  1. Download .jar `https://projectlombok.org/download`
  2. Run `java -jar lombok.jar`
  3. Specify Eclipse install location, example `/home/user/eclipse/java-2023-12/eclipse`
  4. `Install/Update`

### On Docker

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
