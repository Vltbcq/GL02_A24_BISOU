const ShortAnswerQuestion = require('../../../../app/model/base-types/implementations/ShortAnswerQuestion');

test('Type de question à réponse courte', () => {
    expect(ShortAnswerQuestion.questionType).toBe('Réponse courte');
})

test('Egalité questions à réponse courte', () => {
    expect(new ShortAnswerQuestion('question', 'réponse').equal(new ShortAnswerQuestion('question', 'réponse'))).toBeTruthy();
})

test('Inégalité questions à réponse courte', () => {
    expect(new ShortAnswerQuestion('question', 'réponse').equal(new ShortAnswerQuestion('question', 'autre réponse'))).toBeFalsy();
})