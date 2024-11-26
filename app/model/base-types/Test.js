/**
 * Représentation logique d'un examen
 * Définis page 25 du cahier des charges
 */
class Test {
    /**
     * Instancie un examen
     */
    constructor() {
        this._questions = [];
        this._id = Date.now();
    }

    /**
     * @returns {Question[]} - Questions présentes dans l'examen
     */
    get questions() {
        return this._questions;
    }
    set questions(value) {
        this._questions = value;
    }
    get id() {
        return this._id;
    }

    /**
     * @returns {number} - Nombre de questions présentes dans l'examen
     */
    get questionNumber() {
        return this._questions.length;
    }

    /**
     * Un examen n'est valide que si son nombre total de questions est inclus entre 15 et 20
     * @returns {boolean} - Indique si un examen est valide
     */
    get isValid() {
        return 20 >= this.questionNumber && this.questionNumber >= 15
    }

    /**
     * On ajoute une question à l'examen
     * @param question {Question} - Question à ajouter
     */
    addQuestion(question) {
        if (!this.containsQuestion(question)) {
            this._questions.push(question);
        }
    }

    /**
     * Supprimer une question de l'examen
     * @param question {Question} - Question à supprimer
     */
    removeQuestion(question) {
        // On met un filtre qui accepte tous les éléments sauf ceux identiques à celui passé en paramètre
        this._questions = this._questions.filter(item => !item.equal(question));
    }

    /**
     * Indique si une question est présente dans l'examen
     * @param question {Question} - Question recherchée
     * @returns {boolean} - Vrai si la question est dans l'examen
     */
    containsQuestion(question) {
        return this._questions.some(item => item.equal(question));
    }
}

module.exports = Test;