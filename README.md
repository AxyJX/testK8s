Frontend

https://hub.docker.com/repository/docker/iblamevncnt/qr-frontend/general

Backend

https://hub.docker.com/repository/docker/iblamevncnt/qr-backend/general

Build Dockerfile

docker build -t qr-frontend ./frontend

docker build -t qr-backend ./backend

docker pull postgres:latest

Run Image

docker run --name qr-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=qrcodes -p 5432:5432 -d postgres:latest

docker run --name qr-backend -e FLASK_ENV=development -p 5000:5000 qr-backend

docker run --name qr-frontend -p 8080:80 qr-frontend

Apply YAML

kubectl apply -f combined-all.yaml





