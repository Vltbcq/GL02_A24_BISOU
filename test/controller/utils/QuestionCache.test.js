const QuestionCache = require('../../../app/controller/utils/QuestionCache');
const NumericQuestion = require("../../../app/model/base-types/implementations/NumericQuestion");
const ShortAnswerQuestion = require('../../../app/model/base-types/implementations/ShortAnswerQuestion');
const Question = require('../../../app/model/base-types/Question');

test('Récupération de l\'instance du cache des questions', () => {
    expect(QuestionCache.instance).not.toBeNull();
    expect(QuestionCache.instance).toBe(QuestionCache.instance);
})

test("Ajout d'une question au cache", () => {
    let testQuestion = new NumericQuestion("question", 2);
    QuestionCache.instance.addQuestion(testQuestion);
    expect(QuestionCache.instance.questions.some(q => q.equal(new NumericQuestion("question", 2)))).toBeTruthy();
})

test("Ajout d'un mauvais objet au cache des questions", () => {
    const t = () => {
        QuestionCache.instance.addQuestion(5);
    }
    expect(t).toThrow();
})

test("Recherche d'une question dans le cache", () => {
    let testQuestion = new NumericQuestion("question?", 3);
    QuestionCache.instance.addQuestion(testQuestion);
    let id_question = testQuestion._id;
    expect(QuestionCache.instance.getQuestion(id_question).equal(new NumericQuestion("question?", 3))).toBeTruthy();
})