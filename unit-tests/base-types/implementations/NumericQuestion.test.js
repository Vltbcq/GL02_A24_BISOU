const NumericQuestion = require('../../../model/base-types/implementations/NumericQuestion');

test('Type de question numérique', () => {
    expect(new NumericQuestion('question', 3).questionType).toBe('Numérique');
})

test('Egalité des questions numériques', () => {
    expect(new NumericQuestion('question', 4)).toEqual(new NumericQuestion('question', 4));
})