# Global Traffic Frontend

Build the Docker image:

```bash
docker build -t global-traffic-frontend .
```

Run the Docker container:

```bash
docker run --env-file .env -p 8080:80 global-traffic-frontend
```
