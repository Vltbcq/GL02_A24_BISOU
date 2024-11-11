const BlankWordQuestion = require('../../../model/base-types/implementations/BlankWordQuestion');

test('Type de question mot manquant', () => {
    expect(new BlankWordQuestion('début', 'fin', 'mot manquant').questionType).toBe('Mot Manquant');
});

test('Egalité question mot manquant', () => {
    expect(new BlankWordQuestion('début', 'fin', 'mot manquant')).toEqual(new BlankWordQuestion('début', 'fin', 'mot manquant'));
});

test('Inégalité question mot manquant', () => {
    expect(new BlankWordQuestion('début', ' ..... fin', 'mot manquant')).not.toEqual(new BlankWordQuestion('début ..... ', 'fin', 'mot manquant'));
})