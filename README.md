# WeatherOps

## Description

Le projet WeatherOps est une application web avec une carte qui permet d'obtenir la météo pour n'importe quel emplacement en France.
Pour cela, il suffit d'entrer une ville dans la barre de recherche ou de cliquer sur un point.

L'application est assez intuitive

## Technologies

Les technologies sont : 

- Front : React en Typescript
- Back : NestTS
- BDD : Supabase (Postgrès)
- APIs : 
  - API du gouvernement pour récupérer les villes de France
  - API d'OpenWeatherMap pour les prévisions météo

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

Guillaume K., Pierre T., Thibault F : Developpement (back, front, API, bdd)
Simon B : DevOPS (Terrafom, Kubernetes, Docker, Documentation)