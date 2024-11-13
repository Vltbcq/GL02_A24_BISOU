const BlankWordQuestion = require('../model/base-types/implementations/BlankWordQuestion')
const QuestionCache = require('./utils/QuestionCache')

class QuestionController {
    /**
     * Créée une nouvelle question à mot manquant
     * @param textPart1 {string} - Première partie du texte
     * @param textPart2 {string} - Deuxième partie du texte
     * @param blankWord {string} - Mot manquant
     */
    createBlankWord(textPart1, textPart2, blankWord) {
        let newQuestion = new BlankWordQuestion(textPart1, textPart2, blankWord);
        QuestionCache.instance.addQuestion(newQuestion);
        return newQuestion;
    }
}

module.exports = QuestionController;