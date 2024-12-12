const Test = require("../../model/base-types/Test");
const deepCloneArray = require("../../model/utils/ArrayUtils");
const ESSerializer = require("esserializer");
const fs = require("fs");
const path = require("path");
const registerAllClasses = require("./ESSerializerInitializer");
const logger = require("../../security/Logger");
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
    registerAllClasses();
    this._tests = [];
    this.#loadState();
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
    logger.info("Accessing to all the tests");
    return deepCloneArray(this._tests);
  }

  /**
   * Retourne un test par son identifiant
   * @param {number} id - L'identifiant du test
   * @returns {Test} - Le test correspondant à l'identifiant
   */
  getTestById(id) {
    logger.info(`Accessing test id : ${id}`);
    const test = this._tests.find((t) => t.id === id);
    if (test) {
      return test;
    } else {
      throw new Error("Test not found");
    }
  }

  /**
   * Ajout d'un nouveau test au cache
   * @param test {Test} - Test
   */
  addTest(test) {
    if (!(test instanceof Test)) {
      throw new Error("Invalid test object");
    }
    logger.info(`Adding new test : ${JSON.stringify(test)}`);
    this._tests.push(test);
    this.#saveState();
  }

  /**
   * Suppression d'un test du cache
   * @param test {Test} - Test
   */
  removeTest(test) {
    if (!(test instanceof Test)) {
      throw new Error("Invalid test object");
    }
    logger.info(`Deleting test of id : ${test.id}`)
    this._tests = this._tests.filter((t) => t.id !== test.id);
    this.#saveState();
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
      logger.info(`Updating the test id : ${test.id} to new value (${JSON.stringify(test)})`);
      existingTest.questions = test.questions;
      this.#saveState();
    } else {
      throw new Error("Test not found");
    }
  }

  #saveState() {
    const json = ESSerializer.serialize(this._tests);
    fs.writeFileSync(path.resolve('./data/tests.json'), json, "utf8");
  }

  #loadState() {
    const jsonData = fs.readFileSync(path.resolve('./data/tests.json'), 'utf8');
    if (jsonData) {
      this._tests = ESSerializer.deserialize(jsonData);
    }
  }
}

module.exports = TestCache;
