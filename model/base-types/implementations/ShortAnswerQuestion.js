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
    get questionType() {
        return 'Réponse courte';
    }

    /**
     * @returns {string} - Réponse attendue à la question
     */
    get answer() {
        return this._answer;
    }
}

module.exports = ShortAnswerQuestion;