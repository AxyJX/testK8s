Frontend

https://hub.docker.com/repository/docker/iblamevncnt/qr-frontend/general

Backend

https://hub.docker.com/repository/docker/iblamevncnt/qr-backend/general

Step by step to run this abysmally ruined and horrifying code:

1. Run Minikube (minikube start)
2. Create the namespace (kubectl create namespace qr-app)
3. Apply YAML, make sure you are in k8s folder (kubectl apply combined-all.yaml)
4. Verify pods, you need to wait 1-2 minutes (kubectl get pods -n qr-app)
5. Access the web (minikube service frontend-service -n qr-app)




