# Global Traffic Frontend

## Deployment

### Option 1: Docker CLI

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

### Option 2: Docker Compose

```bash
docker compose up -d --build
```

## Shutdown and Cleanup

### Option 1: Docker CLI

Stop the container:

```bash
docker stop global-traffic-frontend-container
```

Delete the container:

```bash
docker rm global-traffic-frontend-container
```

### Option 2: Docker Compose

```bash
docker compose down
```
