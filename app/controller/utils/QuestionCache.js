const Question = require("../../model/base-types/Question");
const deepCloneArray = require("../../model/utils/ArrayUtils");
const fs = require("fs");
const path = require("path");
const ESSerializer = require('esserializer');
const registerAllClasses = require("./ESSerializerInitializer");
const logger = require("../../security/Logger");


/**
 * Implémente le cache partagé des controllers
 * On applique ici un singleton pour s'assurer que ce cache soit bien commun à tous les controllers
 *
 * Pour utiliser le cache, passer par l'attribut statique "instance" puis l'utiliser pour appeler les méthodes & propriétés
 */
class QuestionCache {
    static _instance;

    /**
     * Constructeur de la classe NE PAS L'UTILISER DE L'EXTERIEUR, PASSER PAR L'INSTANCE
     */
    constructor() {
        registerAllClasses();
        this._questions = [];
        this.#loadState()
    }

    /**
     * Retourne l'instance du cache (l'instancie si nécessaire)
     * @returns {QuestionCache} - L'instance unique du cache
     */
    static get instance() {
        // Si l'instance n'existe pas alors on l'initialise
        if (this._instance == null) {
            this._instance = new QuestionCache();
        }
        // On retourne l'instance
        return this._instance;
    }

    /**
     * Liste des questions en cache
     * @returns {Question[]} - Liste des questions en cache
     */
    get questions() {
        logger.info("Access made to the question list");
        return deepCloneArray(this._questions);
    }

    /**
     * Ajoute une nouvelle question au cache
     * @param question {Question} - Question
     */
    addQuestion(question) {
        if (!(question instanceof Question)) {
            throw new Error("Something that wasn't a question was passed to the question cache");
        }
        question._id = this.nextId();
        logger.info(`Adding question (${JSON.stringify(question)}) to the question list`);
        this._questions.push(question);
        this.#saveState()
    }

    saveEdition(){
        this.#saveState()
    }

    // à appeler chaque fois qu'une modification est faite dans le cache
    #saveState() {
        const json = ESSerializer.serialize(this._questions);
        fs.writeFileSync(path.resolve('./data/questions.json'), json, "utf8");
    }

    #loadState() {
        const jsonData = fs.readFileSync(path.resolve('./data/questions.json'), 'utf8');
        if (jsonData) {
            this._questions = ESSerializer.deserialize(jsonData);
        }
    }

    /**
     * Recherche de question à partir de l'id
     * @param {number} id - ID de la question
     * @returns {Question} - Question associée à l'id
     */
    getQuestion(id) {
        let foundQuestion = this._questions.find(question => question.id === id);
        if (foundQuestion === undefined){
            throw new Error("This question doesn't exist. Please verify the ID of the question you want.")
        }
        return foundQuestion;
    }

    /**
     * Suppression d'une question du cache
     * @param question {Question} - Question
     */
    removeQuestion(question) {
        if (!(question instanceof Question)) {
        throw new Error("Invalid question object");
        }
        logger.info(`Deleting question of id : ${question.id}`)
        this._questions = this._questions.filter((q) => q.id !== question.id);
        this.#saveState();
  }

    /**
     * ID suivant le dernier ID du cache
     * @returns {number} id - retourne l'id de la prochaine question qui sera dans le cache
     */
    nextId(){
        let questions = this._questions
        if (questions.length > 0) {
            let maxId = Math.max(...questions.map(q => q.id));
            return (maxId + 1);
        } else {
            return (0);
        }
    }
}

module.exports = QuestionCache;
