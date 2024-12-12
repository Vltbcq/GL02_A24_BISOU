# GL02_A24_BISOU

## Installation & lancement

Pour installer l'applicatif, se positionner via le terminal dans le dossier racine et effectuer la commande ``npm install``.

Pour lancer l'applicatif, se positionner via le terminal n'importe où dans le dossier du projet et exécuter la commande ``npm run launch`` (on peut ajouter derrière cette commande celle devant être exécutée par l'applicatif)

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