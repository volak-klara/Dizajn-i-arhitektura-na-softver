FROM openjdk:23-jdk-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*


RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

RUN /app/venv/bin/pip install --no-cache-dir --upgrade pip && \
    /app/venv/bin/pip install --no-cache-dir pandas numpy ta


RUN python3 --version

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

COPY src src

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

RUN mkdir -p /app/scripts
COPY src/main/resources/scripts/* /app/scripts/

RUN mv target/*.jar app.jar

RUN chmod +x /app/scripts/*.py

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]