const Question = require('../Question');

/**
 * Question à mot manquant
 */
class BlankWordQuestion extends Question {
    /**
     * Instancie une question à texte à trou
     * @param textPart1 {string} - Première partie du texte
     * @param textPart2 {string} - Deuxième partie du texte
     * @param blankWord {string} - Mot manquant (réponse)
     */
    constructor(textPart1, textPart2, blankWord) {
        super(`${textPart1} ..... ${textPart2}`);
        this._blankWord = blankWord;
        this._textPart1 = textPart1;
        this._textPart2 = textPart2;
    }

    /**
     * Indique la réponse attendue
     * @returns {string} - Mot manquant
     */
    get blankWord() {
        return this._blankWord;
    }

    /**
     * @inheritDoc
     */
    get questionType() {
        return 'Mot Manquant';
    }

    /**
     * @returns {string} - Début du texte
     */
    get textPart1() {
        return this._textPart1;
    }

    /**
     * @returns {string} - Fin du texte
     */
    get textPart2() {
        return this._textPart2;
    }
}

module.exports = BlankWordQuestion;