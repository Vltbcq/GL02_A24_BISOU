const Question = require('../Question');

/**
 * Question à mot manquant
 */
class BlankWordQuestion extends Question {
    /**
     * Instancie une question à texte à trou
     * @param question {string} - indication pour compléter
     * @param textPart1 {string} - Première partie du texte
     * @param textPart2 {string} - Deuxième partie du texte
     * @param blankWord {string} - Mot manquant (réponse)
     */
    constructor(question, textPart1, textPart2, blankWord) {
        super(question);
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
    static get questionType() {
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

    /**
    * Modifie la première partie de la question
    * @param {string} editedTextPart1
    */
    set textPart1(editedTextPart1){
        this._textPart1 = editedTextPart1;
    }

    /**
    * Modifie la deuxième partie de la question
    * @param {string} editedTextPart2
    */
    set textPart2(editedTextPart2){
        this._textPart2 = editedTextPart2;
    }

    /**
    * Modifie la réponse de la question
    * @param {string} editedBlankWord
    */
    set blankWord(editedBlankWord){
        this._blankWord = editedBlankWord;
    }

    /**
     * @inheritDoc
     */
    equal(other) {
        return super.equal(other)
            && other instanceof BlankWordQuestion
            && other.blankWord === this.blankWord
            && other.textPart1 === this.textPart1
            && other.textPart2 === this.textPart2;
    }
}

module.exports = BlankWordQuestion;