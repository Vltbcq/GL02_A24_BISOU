const Question = require("../Question");

/**
 * Question avec une réponse de type vrai/faux
 */
class TrueFalseQuestion extends Question {
    /**
     * Instancie une question de type vrai/faux
     * @param question {string} - Question posée
     * @param answer {boolean} - Réponse
     */
    constructor(question, answer) {
        super(question);
        this._answer = answer;
        this._question = question;
    }

    get questionType() {
        return 'Vrai/Faux';
    }

    get question() {
        return this._question;
    }
}

module.exports = TrueFalseQuestion;