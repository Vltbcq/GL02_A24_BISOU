const Question = require('../Question');

/**
 * Question numérique
 */
class NumericQuestion extends Question {
    /**
     * Instancie une question numérique
     * @param question {string} - Enoncé de la question
     * @param answer {number} - Réponse
     */
    constructor(question, answer) {
        super(question);
        this._answer = answer;
    }

    /**
     * @returns {number} - Réponse à la question
     */
    get answer() {
        return this._answer;
    }

    get questionType() {
        return 'Numérique';
    }
}

module.exports = NumericQuestion;