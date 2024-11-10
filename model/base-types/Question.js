/**
 * Classe de base représentant le type question définis page 24 du cahier des charges
 * Cette classe doit être considérée comme abstraite, et donc jamais instanciée en tant que telle
 */
class Question {
    /**
     * Indique le type de question
     * @returns {string} Nom indiquant le type de question de l'instance
     */
    getQuestionType() {
        throw new Error("Question type not implemented.");
    }
}