# WeatherOps

## Description

Le projet WeatherOps est une application web avec une carte qui permet d'obtenir la météo pour n'importe quel emplacement en France.
Pour cela, il suffit d'entrer une ville dans la barre de recherche ou de cliquer sur un point.

## Architecture

Le dossier back contient tout le back de l'application

Le dossier front contient tout le front de l'application

Le dossier k8s contient tout concernant kubernetes

Et le dossier terraform contient tout ce qui concerne terraform

## Technologies

Les technologies sont : 

- Front : React en Typescript
- Back : NestTS
- BDD : Supabase (Postgrès)
- APIs : 
  - API du gouvernement pour récupérer les villes de France
  - API d'OpenWeatherMap pour les prévisions météo

## Base de données

Nous avons utilisé supabase comme base de données.

La seule table ayant été créée est la table `favoritesCities` avec le schéma suivant

- id: uuid
- user_id: foreign key -> auth.users.id
- label: text
- lon: numeric
- lat : numeric

## Lancement du projet en local

1. Installer les dépendances dans le front et le back (lancez `npm ci` dans les 2 dossiers)
2. Lancer le front et le back (`npm run dev` pour le front et `npm run start:dev` pour le back)

## Déploiement Kubernetes

Un script de déploiement a été prévu : script.sh

Ce script vous permettra de lancer minikube, builder les différentes images docker, puis d'appliquer les fichiers de configurations présents dans le dossier k8s

## Terraform

Nous allons ici expliquer comment configurer Terraform pour notre projet.
N'ayant pas accès à des solutions de cloud en ligne, ces fichiers ne seront pas fonctionnels.

Ils seront uniquement théorique.
Egalement, notre k8s étant en local, sa configuration sera limitée.

1. Créer un fichier .gitignore pour y mettre l'extension de notre fichier de variables
2. Ajouter *.tfvars dans ce fichier pour ne pas uploader notre variables/secrets sur gitlab
3. Créer variables.tf qui sera le fichier de définition de nos variables
4. Dans ce fichier, indiquer les variables utilisées dans les fichiers de configuration Terrafom
5. Créer main.tf qui sera le fichier de configuration principal
6. Remplir le fichier en reprenant les informations nécessaires (ici, pour Supabase et k8s)
7. Les informations incluses seront basiquement les informations disponibles dans les paramètres de Supabase et dans les fichiers existants k8s


Une fois nos différents fichiers prêts, nous devrons utiliser quelques commandes (en étant dans le répértoire de Terrafom) :

terrafom init : pour initialiser la configuration
terrafom validate : pour vérifier la structure et la syntaxe des fichiers
terrafom apply : pour appliquer les fichiers de configuration et créer les ressources Terraform


2 commandes optionnelles qui pourraient être utiles : 

terraform show : pour voir les ressources Terrafom et leur état 
terraform destroy : pour supprimer les ressources Terraform

Dans un souci de simplicité, nous n'expliquerons pas en détail nos fichiers car nous supposons que notre audience est relativement technique ^^
De plus, de nombreuses templates (exemples de configurations) sont disponibles sur internet et très bien fait :)

## Répartition des tâches 

Guillaume K., Pierre T., Thibault F. : Développement (back, front, API, base de données)
Simon B. : DevOPS (Terrafom, Kubernetes, Docker, Documentation)

Pour plus d'informations sur la répartition des tâches un Kanban de gestion de projet a été fait avec les issues (chaque PR a été relié aux issues correspondantes)

<https://github.com/users/GuillaumeKESTEMAN/projects/9>
