const QuestionController = require('../../app/controller/QuestionController');
const BlankWordQuestion = require('../../app/model/base-types/implementations/BlankWordQuestion');
const QuestionCache = require('../../app/controller/utils/QuestionCache');
const MultipleChoiceQuestion = require('../../app/model/base-types/implementations/MultipleChoiceQuestion');

beforeEach(() => {
    // Ne pas faire ce genre de modifications dans un cas normal, on le fait ici uniquement pour préserver l'individualité des tests
    QuestionCache.instance._questions = [];
})

test('Création d\'une question à mot manquant', () => {
    const controller = new QuestionController();
    expect(controller.createBlankWord('Partie 1', 'Partie 2', 'mot manquant')).toStrictEqual(new BlankWordQuestion('Partie 1', 'Partie 2', 'mot manquant'));
    expect(QuestionCache.instance.questions).toStrictEqual([new BlankWordQuestion('Partie 1', 'Partie 2', 'mot manquant')]);
});

test('Création d\'une question à choix multiples', () => {
    const controller = new QuestionController();
    expect(controller.createMultipleChoice('question', ['réponse fausse', 'réponse valide'], [1])).toStrictEqual(new MultipleChoiceQuestion('question', ['réponse fausse', 'réponse valide'], [1]));
    expect(QuestionCache.instance.questions).toStrictEqual([new MultipleChoiceQuestion('question', ['réponse fausse', 'réponse valide'], [1])]);
})