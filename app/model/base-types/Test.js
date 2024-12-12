const deepCloneArray = require('../utils/ArrayUtils');
const VCardController = require('../../controller/VCardController')
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
        this._vCard = -1;
    }

    /**
     * @returns {Question[]} - Questions présentes dans l'examen
     */
    get questions() {
        // Retourne une copie profonde de l'array tout en préservant les objets Question
        return deepCloneArray(this._questions);
    }

    /**
     * @param value {Question[]} - On écrase les données avec les nouvelles questions
     */
    set questions(value) {
        this._questions = value;
    }

    /**
     * @returns {number} - Identifiant de l'examen
     */
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
     * Un examen n'est valide que si son nombre total de questions est inclus entre 15 et 20 & qu'il est associé à une vCard
     * @returns {boolean} - Indique si un examen est valide
     */
    isValid() {
        return 20 >= this.questionNumber && this.questionNumber >= 15 && this._vCard != -1
    }

    /**
     * On ajoute une question à l'examen
     * @param question {Question} - Question à ajouter
     */
    addQuestion(question) {
        if (!this.containsQuestion(question)) {
            this._questions.push(question);
        }
        else {
            throw new Error("Question already in test");
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

    /**
     * Ajoute une vCard à un test
     * @param {number} vcard_id - ID de la vCard à ajouter
     */
    addVCardToTest(vcard_id){
        let controller = new VCardController();
        if (controller.isCorrectId(vcard_id)){
            this._vCard = vcard_id;
        } else{
            throw new Error("Wrong vCard ID")
        }
    }

    /**
     * Nombre de questions d'un certain type dans un exam 
     * @param {*} type - Type de question qu'on veut compter
     * @returns 
     */
    getTypeOfQuestionNumber(type){
        let count = 0;
        this._questions.forEach(question => {
            if (question instanceof type){
                count ++;
            }
        })
        return count;
    }
}

module.exports = Test;