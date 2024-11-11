const MultipleChoiceQuestion = require("../../../model/base-types/implementations/MultipleChoiceQuestion");

test('Type de question à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", null, null).questionType).toBe('Choix Multiples');
})

test('Egalité entre deux questions à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", ['test', 'test2'], [1])).toStrictEqual(new MultipleChoiceQuestion("question", ['test', 'test2'], [1]));
})

test('Récupération de l\'ensemble des réponses valides à une question à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", ['réponse valide', 'autre réponse valide', 'réponse fausse'], [0, 1]).correctAnswers).toStrictEqual(['réponse valide', 'autre réponse valide']);
})