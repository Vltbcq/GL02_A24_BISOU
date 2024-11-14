const ShortAnswerQuestion = require('../../../../app/model/base-types/implementations/ShortAnswerQuestion');

test('Type de question à réponse courte', () => {
    expect(new ShortAnswerQuestion('question', 'réponse').questionType).toBe('Réponse courte');
})

test('Egalité questions à réponse courte', () => {
    expect(new ShortAnswerQuestion('question', 'réponse')).toStrictEqual(new ShortAnswerQuestion('question', 'réponse'));
})

test('Inégalité questions à réponse courte', () => {
    !expect(new ShortAnswerQuestion('question', 'réponse')).not.toStrictEqual(new ShortAnswerQuestion('question', 'autre réponse'));
})