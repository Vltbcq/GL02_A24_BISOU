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

    static get questionType() {
        return 'Numérique';
    }

    /**
     * Modifie la réponse de la question initialement posée
     * @param {number} editedAnswer
     */
    set answer(editedAnswer){
        this._answer = editedAnswer;
    }

    /**
     * @inheritDoc
     */
    equal(other) {
        return super.equal(other)
            && other instanceof NumericQuestion
            && other.answer === this.answer;
    }
}

module.exports = NumericQuestion;