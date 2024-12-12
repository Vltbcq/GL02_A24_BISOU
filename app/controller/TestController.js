const TestCache = require('./utils/TestCache');
const Test = require('../model/base-types/Test');
const Question = require('../model/base-types/Question');
const BlankWordQuestion = require('../model/base-types/implementations/BlankWordQuestion');
const ShortAnswerQuestion = require('../model/base-types/implementations/ShortAnswerQuestion');
const NumericQuestion = require('../model/base-types/implementations/NumericQuestion');
const TrueFalseQuestion = require('../model/base-types/implementations/TrueFalseQuestion');
const MultipleChoiceQuestion = require('../model/base-types/implementations/MultipleChoiceQuestion');
const vg = require('vega');
const vegalite = require('vega-lite');
const fs = require('fs');
const logger = require("../security/Logger");

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

   /**
    * @returns {Test[]} - retourne tout les examens du cache
    */
   readAll() {
      return TestCache.instance.tests;
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

   /**
    * Statistiques du nombre de questions par type
    * @param {Test} test - Test à évaluer
    * @returns {number[]} - Tableau des comptes de chaque type de question dans un test
    */
   countStats(test){
      let typeOfQuestionsCount = [];
      let typeOfQuestions = [NumericQuestion, BlankWordQuestion, ShortAnswerQuestion, TrueFalseQuestion, MultipleChoiceQuestion]
      typeOfQuestions.forEach(type => {
         let typeCount = test.getTypeOfQuestionNumber(type);
         typeOfQuestionsCount.push(typeCount);
      })
      return typeOfQuestionsCount;
   }

   /**
    * Statistiques de la proportion de questions par type
    * @param {Test} test - Test à évaluer
    * @returns {number[]} - Tableau des proportions de chaque type de question dans un test
    */
   avgStats(test){
      let stats = this.countStats(test);
      return stats.map(count => count/(test.questionNumber));
   }

   /**
    * Statistiques de la proportion de questions par type pour plusieurs tests 
    * @param {number[]} tests - Tests à évaluer 
    * @returns {number[]} - Tableau des proportions de chaque type de question pour plusieurs tests
    */
   globalAvgStats(tests){
      let avgTotalStats = [0,0,0,0,0]; //NumericQuestion, BlankWordQuestion, ShortAnswerQuestion, TrueFalseQuestion, MultipleChoiceQuestion
      tests.forEach(test => {
         let tab = this.avgStats(test);
         for (let i = 0; i < 5; i++){
            avgTotalStats[i] += tab[i];
         }
      })
      return avgTotalStats.map(avg => avg/(tests.length));
  }

  /**
   * Visualisation du profil d'examen
   * @param {number} testId - ID du profil de test recherché
   * @param {Test[]} tests - Liste contenant le test recherché
   */
  testProfile(testId, tests){
   let test = tests.find(test => test._id === testId);
   if (test === undefined){
      throw new Error("Can't find the test, please make sure that you entered the good ID");
   }
   if (!(test.isValid())){
      throw new Error("This test isn't valid");
   }
   let profile = this.countStats(test);

   //Visualisation
   let nbChart = {
      "data": {
        "values": [
          {"type": "NumericQuestion", "proportion": profile[0], "category": "Test Profile"},
          {"type": "BlankWordQuestion", "proportion": profile[1], "category": "Test Profile"},
          {"type": "ShortAnswerQuestion", "proportion": profile[2], "category": "Test Profile"},
          {"type": "TrueFalseQuestion", "proportion": profile[3], "category": "Test Profile"},
          {"type": "MultipleChoiceQuestion", "proportion": profile[4], "category": "Test Profile"}
        ]
      },
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "type",
          "type": "nominal",
          "axis": {"title": "Question Type"},
          "sort": ["NumericQuestion", "BlankWordQuestion", "ShortAnswerQuestion", "TrueFalseQuestion", "MultipleChoiceQuestion"]
        },
        "y": {
          "field": "proportion",
          "type": "quantitative",
          "axis": {"title": "Proportion"}
        },
        "color": {
          "field": "category",
          "type": "nominal",
          "scale": {"range": ["#4C78A8"]},
          "legend": {"title": "Category"}
        },
        "tooltip": [
          {"field": "type", "type": "nominal", "title": "Question Type"},
          {"field": "proportion", "type": "quantitative", "title": "Proportion", "format": ".2f"},
          {"field": "category", "type": "nominal", "title": "Category"}
        ]
      },
      "config": {
        "view": {"stroke": "transparent"},
        "axis": {"labelFontSize": 12, "titleFontSize": 14}
      }
    }

   const myChart = vegalite.compile(nbChart).spec;
   
   /* SVG version */
   var runtime = vg.parse(myChart);
   var view = new vg.View(runtime).renderer('svg').run();
   var mySvg = view.toSVG();
   mySvg.then(function(res){
      fs.writeFileSync("./test_profile.svg", res)
      view.finalize();
      logger.info("%s", JSON.stringify(myChart, null, 2));
      logger.info("Chart output : ./test_profile.svg");
   });
 
}

/**
 * Statistiques du test à comparer
 * @param {number} testId - ID du test à comparer
 * @param {Test[]} tests - Liste contenant le test à comparer
 * @returns {number[]} - Statistiques en proportion du test à comparer
 */
testToCompareStats(testId, tests){
   let testToCompare = tests.find(test => test._id === testId);
   if (testToCompare === undefined){
      throw new Error("Can't find the test, please make sure that you entered the good ID")
   }
   return this.avgStats(testToCompare);
}

/**
 * Statistiques des autres tests
 * @param {number} testId - ID du test à exclure
 * @param {Test[]} tests - Liste contenant le test à exclure
 * @returns {number[]} - Statistiques globales en proportion des autres tests
 */

otherTestsStats(testId, tests){
   let otherTests = tests.filter(test => test._id !== testId);
   if (otherTests.length === 0){
      throw new Error("There is no tests to compare")
   }
   return this.globalAvgStats(otherTests);
}


  /**
   * Visualisation de la comparaison d'examens
   * @param {number} testId
   */
  compare(testId, tests){
   let testStats = this.testToCompareStats(testId, tests)
   let otherTestsStats = this.otherTestsStats(testId, tests)

   //Visualisation
   var avgChart = {
      "data": {
        "values": [
          {"type": "NumericQuestion", "proportion": otherTestsStats[0], "category": "Average Test Profile"},
          {"type": "BlankWordQuestion", "proportion": otherTestsStats[1], "category": "Average Test Profile"},
          {"type": "ShortAnswerQuestion", "proportion": otherTestsStats[2], "category": "Average Test Profile"},
          {"type": "TrueFalseQuestion", "proportion": otherTestsStats[3], "category": "Average Test Profile"},
          {"type": "MultipleChoiceQuestion", "proportion": otherTestsStats[4], "category": "Average Test Profile"},
          {"type": "NumericQuestion", "proportion": testStats[0], "category": "Test to Compare"},
          {"type": "BlankWordQuestion", "proportion": testStats[1], "category": "Test to Compare"},
          {"type": "ShortAnswerQuestion", "proportion": testStats[2], "category": "Test to Compare"},
          {"type": "TrueFalseQuestion", "proportion": testStats[3], "category": "Test to Compare"},
          {"type": "MultipleChoiceQuestion", "proportion": testStats[4], "category": "Test to Compare"}
        ]
      },
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "type",
          "type": "nominal",
          "axis": {"title": "Question Type"},
          "sort": ["NumericQuestion", "BlankWordQuestion", "ShortAnswerQuestion", "TrueFalseQuestion", "MultipleChoiceQuestion"]
        },
        "y": {
          "field": "proportion",
          "type": "quantitative",
          "axis": {"title": "Proportion"}
        },
        "color": {
          "field": "category",
          "type": "nominal",
          "scale": {"range": ["#4C78A8", "#F58518"]},
          "legend": {"title": "Category"}
        },
        "tooltip": [
          {"field": "type", "type": "nominal", "title": "Question Type"},
          {"field": "proportion", "type": "quantitative", "title": "Proportion", "format": ".2f"},
          {"field": "category", "type": "nominal", "title": "Category"}
        ],
        "xOffset": {"field": "category", "type": "nominal"}
      },
      "config": {
        "view": {"stroke": "transparent"},
        "axis": {"labelFontSize": 12, "titleFontSize": 14}
      }
    }
    

   const myChart = vegalite.compile(avgChart).spec;
			
   /* SVG version */
   var runtime = vg.parse(myChart);
   var view = new vg.View(runtime).renderer('svg').run();
   var mySvg = view.toSVG();
   mySvg.then(function(res){
      fs.writeFileSync("./comparison.svg", res)
      view.finalize();
      logger.info("%s", JSON.stringify(myChart, null, 2));
      logger.info("Chart output : ./comparison.svg");
   });
}

}

module.exports = TestController;