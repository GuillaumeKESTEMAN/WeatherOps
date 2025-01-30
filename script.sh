#!/bin/bash

# Démarrer Minikube
minikube start

# Configurer le terminal pour utiliser le daemon Docker de Minikube
eval $(minikube -p minikube docker-env)

# Construire les images
cd /home/simon/Downloads/projet_git/WeatherOps/front
docker build -t frontend .

cd /home/simon/Downloads/projet_git/WeatherOps/back
docker build -t backend .

# Appliquer les fichiers de configuration Kubernetes
cd /home/simon/Downloads/projet_git/WeatherOps/k8s
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

# Vérifier l'état des pods
kubectl get pods
kubectl get deployments
