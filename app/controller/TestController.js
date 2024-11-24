const TestCache = require('./utils/TestCache');
const Test = require('../model/base-types/Test');
const Question = require('../model/base-types/Question');

/**
 * Contrôleur des examens, gère les opérations portant sur celui-ci
 */
class TestController {
   /**
   * Créée un nouvel examen et le sauvegarde dans le cache
   * @returns {Test} - Examen créé
   */
   createTest() {
      const test = new Test();
      this.#addToCache(test);
      return test;
   }

   /**
    * Ajoute une question à un examen et met à jour le cache
    * @param test {Test} - Examen
    * @param question {Question} - Question à ajouter
    */
   addQuestionToTest(test, question) {
      test.addQuestion(question);
      this.#updateCache(test);
   }

   /**
    * Supprime une question d'un examen et met à jour le cache
    * @param test {Test} - Examen
    * @param question {Question} - Question à supprimer
    */
   removeQuestionFromTest(test, question) {
      test.removeQuestion(question);
      this.#updateCache(test);
   }

   /**
    * Indique si une question est présente dans un examen
    * @param test {Test} - Examen
    * @param question {Question} - Question recherchée
    * @returns {boolean} - Vrai si la question est dans l'examen
    */
   testContainsQuestion(test, question) {
      return test.containsQuestion(question);
   }

   /**
    * Supression d'un examen et le retire du cache
    * @param test {Test} - Examen à supprimer
    */
   deleteTest(test) {
      this.#removeFromCache(test);
   }

   // Ajoute un examen au cache
   #addToCache(newTest) {
      TestCache.instance.addTest(newTest);
   }

   // Supprime un examen du cache
   #removeFromCache(test) {
      TestCache.instance.removeTest(test);
   }

   // Met à jour un examen dans le cache
   #updateCache(test) {
      TestCache.instance.updateTest(test);
   }
}

module.exports = TestController;