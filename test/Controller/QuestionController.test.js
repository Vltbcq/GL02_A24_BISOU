const QuestionController = require('../../app/controller/QuestionController');
const BlankWordQuestion = require('../../app/model/base-types/implementations/BlankWordQuestion');
const QuestionCache = require('../../app/controller/utils/QuestionCache');

test('Création d\'une question à mot manquant', () => {
    const controller = new QuestionController();
    expect(controller.createBlankWord('Partie 1', 'Partie 2', 'mot manquant')).toStrictEqual(new BlankWordQuestion('Partie 1', 'Partie 2', 'mot manquant'));
    expect(QuestionCache.instance.questions).toStrictEqual([new BlankWordQuestion('Partie 1', 'Partie 2', 'mot manquant')]);
});