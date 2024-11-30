const QuestionCache = require('../../../app/controller/utils/QuestionCache');
const NumericQuestion = require("../../../app/model/base-types/implementations/NumericQuestion");

test('Récupération de l\'instance du cache des questions', () => {
    expect(QuestionCache.instance).not.toBeNull();
    expect(QuestionCache.instance).toBe(QuestionCache.instance);
})

test("Ajout d'une question au cache", () => {
    QuestionCache.instance.addQuestion(new NumericQuestion("question", 2));
    expect(QuestionCache.instance.questions).toContainEqual(new NumericQuestion("question", 2));
})

test("Ajout d'un mauvais objet au cache des questions", () => {
    const t = () => {
        QuestionCache.instance.addQuestion(5);
    }
    expect(t).toThrow();
})