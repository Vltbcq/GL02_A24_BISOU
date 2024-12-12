const BlankWordQuestion = require('../../../../app/model/base-types/implementations/BlankWordQuestion');

test('Type de question mot manquant', () => {
    expect(BlankWordQuestion.questionType).toBe('Mot Manquant');
});

test('Egalité question mot manquant', () => {
    expect(new BlankWordQuestion('début', 'fin', 'mot manquant').equal(new BlankWordQuestion('début', 'fin', 'mot manquant'))).toBeTruthy();
});

test('Inégalité question mot manquant', () => {
    expect(new BlankWordQuestion('début', ' ..... fin', 'mot manquant').equal(new BlankWordQuestion('début ..... ', 'fin', 'mot manquant'))).toBeFalsy();
})

test('Lecture du mot manquant dans une question à mot manquant', () => {
    expect(new BlankWordQuestion('enonce','début', 'fin', 'mot manquant').blankWord).toBe('mot manquant');
})