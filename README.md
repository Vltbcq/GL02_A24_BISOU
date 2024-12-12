# GL02_A24_BISOU

## Installation & lancement

Pour installer l'applicatif, se positionner à la racine du répertoire du projet et exécuter la commande `npm install`
Une fois cela fait l'application sera disponible dans le terminal de façon locale dans le répertoire du projet via la commande ``npm exec bisou``
ou directement en se plaçant à l'intérieur du dossier et en éxécutant `npm run launch` pour accéder à la liste des commandes, on execute ensutie npm run launch suivi de la commande voulu

## Architecture du projet

### Deux composants principaux sont présents dans le projet :

- **Applicatif (/app)** : contient le code source de l'applicatif
- **Tests unitaires (/test)** : contient les tests unitaires du projet

Ces deux couches suivent la même structure interne.

### Le projet est divisé en mode [multicouche](https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture) approchant le modèle [MVC](https://fr.wikipedia.org/wiki/Modèle-vue-contrôleur) :

- **Model** : contient les classes qui représentent les données manipulées par l'applicatif
- **Controller** : contient les classes qui permettent de manipuler les données
- **View** : contient les classes qui permettent d'afficher les données
- **Security** : contient les classes liées aux notions liées à la sécurité (actuellement simplement le logger)

## Lancement des tests unitaires

Les tests unitaires sont faits avec la librairie [Jest](https://jestjs.io/fr/).
Pour lancer les tests, quelques commandes sont disponibles dans la configuration du projet :
- ``npm test`` permet de tester l'entièreté du projet
- ``npm run test:model`` permet de tester uniquement la couche model
- ``npm run test:controller`` permet de tester uniquement la couche controller

## Données de test

Vous avez à votre disposition des questions et des tests prédéfinis pour vous aidez à réaliser des tests dans les fichiers testing_questions.json et testing_tests.json
--> copier le contenu dans les fichiers questions.json et tests.json du dossier data

## Écarts au cahier des charges

**SPEC 2** : Il a été décidé que les examens n'auront pas de titre, on les considérera uniquement avec leur identifiant. (Donc pas d'erreur de titre déjà utilisé)

**SPEC 6** : Pas de fonction de validation, l'examen est automatiquement mis en validation ou non en fonction des critères demandés.
