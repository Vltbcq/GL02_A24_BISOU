/**
 * Implémente le cache des examens
 *
 * Pour utiliser le cache, passer par l'attribut statique "instance" puis l'utiliser pour appeler les méthodes & propriétés
 */
class TestCache {
   static _instance;

   /**
    * Constructeur de la classe NE PAS L'UTILISER DE L'EXTERIEUR, PASSER PAR L'INSTANCE
    */
   constructor() {
       this._tests = [];
   }

   /**
    * Retourne l'instance du cache (l'instancie si nécessaire)
    * @returns {TestCache} - L'instance unique du cache
    */
   static get instance() {
       // Si l'instance n'existe pas alors on l'initialise
       if (this._instance == null) {
           this._instance = new TestCache();
       }
       // On retourne l'instance
       return this._instance;
   }

   /**
    * Liste des examens en cache
    * @returns {Test[]} - Liste des examens en cache
    */
   get tests() {
       return this._tests
   }

   /**
    * Ajout d'un nouveau test au cache
    * @param test {Test} - Test
    */
   addTest(test) {
       this._tests.push(test);
   }

   /**
    * Suppression d'un test du cache
    * @param test {Test} - Test
    */
   removeTest(test) {
       this._tests = this._tests.filter(t => t !== test);
   }
   /**
    * Mise à jour d'un test dans le cache
    * @param test {Test} - Test
    */
   updateTest(test) {
       const index = this._tests.findIndex(t => t === test);
       if (index !== -1) {
           this._tests[index] = test;
       }
   }
}

module.exports = TestCache;