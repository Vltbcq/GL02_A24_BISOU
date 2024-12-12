const Question = require("../Question");
const arrayEqual = require("../../utils/ArrayComparator");
/**
 * Définis une question à choix multiples
 */
class MultipleChoiceQuestion extends Question {
    /**
     * Instancie une question à choix multiples
     * @param {string} question - Question posée
     * @param {string[]} answerSet - Ensemble des réponses possibles
     * @param {number[]} correctAnswers - Index des réponses valide
     */
    constructor(question, answerSet, correctAnswers) {
        super(question);
        this._answerSet = answerSet;
        this._correctAnswers = correctAnswers;
    }

    /**
     * @inheritDoc
     */
    static get questionType() {
        return "Choix Multiples";
    }

    /**
     * @returns {string[]} - L'ensemble des réponses proposées à la question
     */
    get answerSet() {
        return this._answerSet;
    }

    /**
     * @returns {string[]} - Calcule les réponses valides
     */
    get correctAnswers() {
        let ret = [];
        for (const correctAnswer of this._correctAnswers) {
            ret.push(this.answerSet.at(correctAnswer));
        }
        return ret;
    }

    /**
     * Modifie l'ensemble des réponses possibles
     * @param {string[]} editedAnswerSet - Ensemble des réponses possibles
     */
    set answerSet(editedAnswerSet){
        this._answerSet = editedAnswerSet;
    }

    /**
     * Modifie l'index des réponses valides
     * @param {number[]} editedCorrectAnswers - Index des réponses valide
     */
    set correctAnswers(editedCorrectAnswers){
        this._correctAnswers = editedCorrectAnswers;
    }

    /**
     * @inheritDoc
     */
    equal(other) {
        return super.equal(other)
            && other instanceof MultipleChoiceQuestion
            && arrayEqual(other.correctAnswers, this.correctAnswers)
            && arrayEqual(other.answerSet, this.answerSet);
    }
}

module.exports = MultipleChoiceQuestion;