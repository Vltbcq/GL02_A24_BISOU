const BlankWordQuestion = require('../model/base-types/implementations/BlankWordQuestion')
const QuestionCache = require('./utils/QuestionCache')
const MultipleChoiceQuestion = require('../model/base-types/implementations/MultipleChoiceQuestion')
const NumericQuestion = require('../model/base-types/implementations/NumericQuestion')
const ShortAnswerQuestion = require('../model/base-types/implementations/ShortAnswerQuestion')
const TrueFalseQuestion = require("../model/base-types/implementations/TrueFalseQuestion");

/**
 * Contrôleur des questions, gère les opérations portant sur celle-ci
 */
class QuestionController {
    /**
     * Créée une nouvelle question à mot manquant
     * @param textPart1 {string} - Première partie du texte
     * @param textPart2 {string} - Deuxième partie du texte
     * @param blankWord {string} - Mot manquant
     * @return {BlankWordQuestion} - Question créée
     */
    createBlankWord(question, textPart1, textPart2, blankWord) {
        let newQuestion = new BlankWordQuestion(question, textPart1, textPart2, blankWord);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une nouvelle question à réponses multiples
     * @param question {string} - Enoncé de la question
     * @param answerSet {string[]} - Ensemble des réponses proposées
     * @param correctAnswers {string[]} - Liste des réponses valides
     * @return {MultipleChoiceQuestion} - Question créée
     */
    createMultipleChoice(question, answerSet, correctAnswers) {
        const correctAnswersIndexes = correctAnswers.map(answer => answerSet.indexOf(answer));
        let newQuestion = new MultipleChoiceQuestion(question, answerSet, correctAnswersIndexes);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une nouvelle question numérique
     * @param question {string} - Enoncé de la question
     * @param answer {number} - Réponse valide
     * @return {NumericQuestion} - Question créée
     */
    createNumeric(question, answer) {
        let newQuestion = new NumericQuestion(question, answer);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une nouvelle question à réponse courte
     * @param question {string} - Enoncé de la question
     * @param answer - Réponse attendue
     * @returns {ShortAnswerQuestion} - Question créée
     */
    createShortAnswer(question, answer) {
        let newQuestion = new ShortAnswerQuestion(question, answer);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Créée une question vrai/faux
     * @param question {string} - Enoncé de la question
     * @param answer {boolean} - Réponse valide
     * @returns {TrueFalseQuestion} - Question instanciée
     */
    createTrueFalse(question, answer) {
        let newQuestion = new TrueFalseQuestion(question, answer);
        this.#addToCache(newQuestion);
        return newQuestion;
    }

    /**
     * Modifie l'énoncé d'une question
     * @param {Question} questionToEdit
     * @param {string} editedText
     */
    editQuestion(questionToEdit, editedText){
        questionToEdit.question = editedText;
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie une question à mot manquant
     * @param {BlankWordQuestion} blankWordQuestion
     * @param {string} editedText
     * @param {number} part
     */
    editBlankWord(blankWordQuestion, editedText, part){
        if (part === 1)
            blankWordQuestion.textPart1 = editedText;
        else if (part === 2)
            blankWordQuestion.textPart2 = editedText;
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie une réponse à une question à mot manquant
     * @param {BlankWordQuestion} blankWordQuestion
     * @param {string} editedText
     */
    editBlankWordAnswer(blankWordQuestion, editedText){
        blankWordQuestion.blankWord = editedText;
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie l'ensemble des réponses d'une question à choix multiples
     * @param {MultipleChoiceQuestion} multipleChoiceQuestion
     * @param {string} editedText
     */
    editMultipleChoiceAnswerSet(multipleChoiceQuestion, editedText){
        multipleChoiceQuestion.answerSet = editedText.split(',').map(item => item.trim());
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie les réponses correctes des réponses d'une question à choix multiples
     * @param {MultipleChoiceQuestion} multipleChoiceQuestion
     * @param {string} editedText
     */
    editMultipleChoiceCorrectAnswer(multipleChoiceQuestion, editedText){
        const correctAnswers = editedText.split(',').map(item => item.trim());
        const indexes = correctAnswers.map(answer => multipleChoiceQuestion._answerSet.indexOf(answer));
        if (indexes.includes(-1)) {
            throw new Error("Be careful. Some of the answers you gave might not be in the answet set.");
        }
        multipleChoiceQuestion.correctAnswers = indexes;
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie une réponse à une question numérique
     * @param {NumericQuestion} numericQuestion
     * @param {number} editedText
     */
    editNumericAnswer(numericQuestion, editedText){
        numericQuestion.answer = editedText;
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie une réponse à une question à réponse courte
     * @param {ShortAnswerQuestion} shortAnswerQuestion
     * @param {string} editedText
     */
    editShortAnswerAnswer(shortAnswerQuestion, editedText){
        shortAnswerQuestion.answer = editedText;
        QuestionCache.instance.saveEdition();
    }

    /**
     * Modifie une réponse à une question vrai/faux
     * @param {TrueFalseQuestion} trueFalseQuestion
     * @param {boolean} editedText
     */
    editTrueFalseAnswer(trueFalseQuestion, editedText){
        trueFalseQuestion.answer = editedText;
        QuestionCache.instance.saveEdition();
    }

    /**
     * @returns {Question[]} - Toutes les questions en cache
     */
    readAll() {
        return QuestionCache.instance.questions;
    }

    /**
     * Effectue une recherche sur les questions en cache, chaque paramètre est optionnel
     * @param questionText {string} - String recherchée sur l'énoncé de la question
     * @param questionType {string} - Type de la question
     * @returns {Question[]} - Questions filtrées selon les critères passés en paramètre
     */
    search(questionText = null, questionType = null) {
        let result = this.readAll();
        if (questionText) {
            result = result.filter(question => question.question.includes(questionText));
        }
        if (questionType) {
            result = result.filter(question => Object.getPrototypeOf(question).constructor.questionType === questionType);
        }
        return result;
    }

    /**
    * Supression d'une question et la retire du cache
    * @param question {Question} - Question à supprimer
    */
    deleteQuestion(question) {
        this.#removeFromCache(question);
    }
    
    // Ajoute une question au cache
    #addToCache(newQuestion) {
        QuestionCache.instance.addQuestion(newQuestion);
    }

    // Supprime une question du cache
    #removeFromCache(question) {
        QuestionCache.instance.removeQuestion(question);
    }
}

module.exports = QuestionController;
