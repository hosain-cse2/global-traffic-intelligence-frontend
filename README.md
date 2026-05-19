# Global Traffic Frontend

## Managing the Application with Docker Compose

Start the application:

```bash
docker compose up -d --build
```

Stop the application:

```bash
docker compose down
```

## Managing the Application with Docker CLI

Build the Docker image:

```bash
docker build -t global-traffic-frontend:latest .
```

Run the Docker container:

```bash
docker run \
  --name global-traffic-frontend-container \
  --env-file .env \
  -p 8080:80 \
  global-traffic-frontend:latest
```

Stop the container:

```bash
docker stop global-traffic-frontend-container
```

Delete the container:

```bash
docker rm global-traffic-frontend-container
```
