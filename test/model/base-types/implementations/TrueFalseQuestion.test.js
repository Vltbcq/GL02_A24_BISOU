const TrueFalseQuestion = require('../../../../app/model/base-types/implementations/TrueFalseQuestion');

test('Type de question vrai/faux', () => {
    expect(TrueFalseQuestion.questionType).toBe('Vrai/Faux');
})

test('Egalité questions vrai/faux', () => {
    expect(new TrueFalseQuestion("question", true).equal(new TrueFalseQuestion("question", true))).toBeTruthy();
})