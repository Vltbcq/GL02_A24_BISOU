const BlankWordQuestion = require('../../../../app/model/base-types/implementations/BlankWordQuestion');

test('Type de question mot manquant', () => {
    expect(new BlankWordQuestion('début', 'fin', 'mot manquant').questionType).toBe('Mot Manquant');
});

test('Egalité question mot manquant', () => {
    expect(new BlankWordQuestion('début', 'fin', 'mot manquant')).toStrictEqual(new BlankWordQuestion('début', 'fin', 'mot manquant'));
});

test('Inégalité question mot manquant', () => {
    expect(new BlankWordQuestion('début', ' ..... fin', 'mot manquant')).not.toStrictEqual(new BlankWordQuestion('début ..... ', 'fin', 'mot manquant'));
})

test('Lecture du mot manquant dans une question à mot manquant', () => {
    expect(new BlankWordQuestion('début', 'fin', 'mot manquant').blankWord).toBe('mot manquant');
})