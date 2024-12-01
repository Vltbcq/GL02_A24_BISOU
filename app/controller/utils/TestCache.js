const Test = require("../../model/base-types/Test");
const deepCloneArray = require("../../model/utils/ArrayUtils");
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
    return deepCloneArray(this._tests);
  }

  /**
   * Retourne un test par son identifiant
   * @param {number} id - L'identifiant du test
   * @returns {Test} - Le test correspondant à l'identifiant
   */
  getTestById(id) {
    return this._tests.find((t) => t.id === id);
  }

  /**
   * Ajout d'un nouveau test au cache
   * @param test {Test} - Test
   */
  addTest(test) {
    if (!(test instanceof Test)) {
      throw new Error("Invalid test object");
    }
    this._tests.push(test);
  }

  /**
   * Suppression d'un test du cache
   * @param test {Test} - Test
   */
  removeTest(test) {
    if (!(test instanceof Test)) {
      throw new Error("Invalid test object");
    }
    this._tests = this._tests.filter((t) => t.id !== test.id);
  }
  /**
   * Mise à jour d'un test dans le cache
   * @param test {Test} - Test
   */
  updateTest(test) {
    if (!(test instanceof Test)) {
      throw new Error("Invalid test object");
    }
    const existingTest = this.getTestById(test.id);
    if (existingTest) {
      existingTest.questions = test.questions;
    } else {
      throw new Error("Test not found");
    }
  }
}

module.exports = TestCache;
