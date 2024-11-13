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
        this._questions = [];
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
        return this._questions
    }

    /**
     * Ajoute une nouvelle question au cache
     * @param question {Question} - Question
     */
    addQuestion(question) {
        this._questions.push(question);
    }
}

module.exports = QuestionCache;