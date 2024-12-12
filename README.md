# GL02_A24_BISOU

Pour installer l'applicatif, se positionner à la racine du répertoire du projet et exécuter la commande `npm install -g`
Une fois cela fait l'application sera disponible dans le terminal de façon globale sur la machine via la commande ``bisou``

## Lancement des tests unitaires
Les tests unitaires sont faits avec la librairie [Jest](https://jestjs.io/fr/).
Pour lancer les tests, quelques commandes sont disponibles dans la configuration du projet :
- ``npm test`` permet de tester l'entièreté du projet
- ``npm run test:model`` permet de tester uniquement la couche model
- ``npm run test:controller`` permet de tester uniquement la couche controller