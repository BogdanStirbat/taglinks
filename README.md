A small SPA using JQuery, for experimentation. It's a Spring Boot application.

How to build the project:
```shell
  mvn clean install
```

How to run the project:
```shell.
  java -jar target/taglinks-0.0.1-SNAPSHOT.jar
```
then, go to [http://localhost:8080/](http://localhost:8080/) .

The backend uses an in-memory H2 database. For querrying the data, you can go to [http://localhost:8080/h2_console/login.jsp](http://localhost:8080/h2_console/login.jsp) .
