const MultipleChoiceQuestion = require("../../../model/base-types/implementations/MultipleChoiceQuestion");

test('Type de question à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", null, null).questionType).toBe('Question à choix multiples');
})

test('Egalité entre deux questions à choix multiples', () => {
    expect(new MultipleChoiceQuestion("question", ['test', 'test2'], [1])).toEqual(new MultipleChoiceQuestion("question", ['test', 'test2'], [1]));
})