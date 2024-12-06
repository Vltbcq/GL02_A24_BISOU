const Question = require('../Question');

/**
 * Question avec réponse ouverte courte
 */
class ShortAnswerQuestion extends Question {
    /**
     * Instancie une question à réponse courte
     * @param question {string} - Question posée
     * @param answer {string} - Réponse attendue
     */
    constructor(question, answer) {
        super(question);
        this._answer = answer;
    }

    /**
     * @inheritDoc
     */
    static get questionType() {
        return 'Réponse courte';
    }

    /**
     * @returns {string} - Réponse attendue à la question
     */
    get answer() {
        return this._answer;
    }

    /**
    * Modifie la réponse de la question initialement posée
    * @param {string} editedAnswer
    */
    set answer(editedAnswer){
        this._answer = editedAnswer;
    }

    /**
     * @inheritDoc
     */
    equal(other) {
        return this._question === other._question
            && other instanceof ShortAnswerQuestion
            && other.answer === this.answer;
    }
}

module.exports = ShortAnswerQuestion;