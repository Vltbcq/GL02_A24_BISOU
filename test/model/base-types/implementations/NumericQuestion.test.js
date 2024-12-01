const NumericQuestion = require('../../../../app/model/base-types/implementations/NumericQuestion');

test('Type de question numérique', () => {
    expect(NumericQuestion.questionType).toBe('Numérique');
})

test('Egalité des questions numériques', () => {
    expect(new NumericQuestion('question', 4)).toStrictEqual(new NumericQuestion('question', 4));
})