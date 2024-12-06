const MultipleChoiceQuestion = require("../../../../app/model/base-types/implementations/MultipleChoiceQuestion");

test('Type de question à choix multiples', () => {
    expect(MultipleChoiceQuestion.questionType).toBe('Choix Multiples');
})

test('Egalité entre deux questions à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", ['test', 'test2'], [1]).equal(new MultipleChoiceQuestion("question", ['test', 'test2'], [1]))).toBeTruthy();
})

test('Récupération de l\'ensemble des réponses valides à une question à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", ['réponse valide', 'autre réponse valide', 'réponse fausse'], [0, 1]).correctAnswers).toStrictEqual(['réponse valide', 'autre réponse valide']);
})