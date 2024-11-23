
const Test = require('../model/base-types/Test')
const Question = require('../model/base-types/Question');
/**
 * Contrôleur des examens, gère les opérations portant sur celui-ci
 */
class TestController {
      /**
      * Créée un nouvel examen
      * @returns {Test} - Examen créé
      */
      createTest() {
         return new Test();
      }
      /**
       * Ajoute une question à un examen
       * @param test {Test} - Examen
       * @param question {Question}- Question à ajouter
       */
      addQuestionToTest(test, question) {
         test.addQuestion(question);
      }
      /**
       * Supprime une question d'un examen
       * @param test {Test} - Examen
       * @param question - Question à supprimer
       */
      removeQuestionFromTest(test, question) {
         test.removeQuestion(question);
      }
      /**
       * Indique si une question est présente dans un examen
       * @param test {Test} - Examen
       * @param question - Question recherchée
       * @returns {boolean} - Vrai si la question est dans l'examen
       */
      testContainsQuestion(test, question) {
         return test.containsQuestion(question);
      }
      /**
       * Supression d'un examen
       * @param test {Test} - Examen à supprimer
       */
      deleteTest(test) {
         test = null;
      }
}
module.exports = TestController;