/**
 * Classe de base représentant le type question définis page 24 du cahier des charges
 * Cette classe doit être considérée comme abstraite, et donc jamais instanciée en tant que telle
 */
class Question {
    /**
     * Instancie une question (à n'utiliser que dans des cas d'héritages)
     * @param question - Enoncé de la question posée
     */
    constructor(question) {
        this._question = question;
    }

    /**
     * Indique le type de question
     * @returns {string} - Nom indiquant le type de question
     */
    static get questionType() {
        throw new Error("Question type not implemented.");
    }

    /**
     * @returns {string} - Question posée
     */
    get question() {
        return this._question;
    }

    /**
     * Vérifie l'égalité avec un autre objet
     * @param other - Autre objet à tester
     * @returns {boolean} - Vrai si les deux sont égaux
     */
    equal(other) {
        return other instanceof Question
            && typeof other === typeof this
            && other.question === this.question;
    }
}

module.exports = Question;