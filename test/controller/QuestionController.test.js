const QuestionController = require('../../app/controller/QuestionController');
const BlankWordQuestion = require('../../app/model/base-types/implementations/BlankWordQuestion');
const QuestionCache = require('../../app/controller/utils/QuestionCache');
const MultipleChoiceQuestion = require('../../app/model/base-types/implementations/MultipleChoiceQuestion');
const NumericQuestion = require('../../app/model/base-types/implementations/NumericQuestion');
const ShortAnswerQuestion = require('../../app/model/base-types/implementations/ShortAnswerQuestion');
const TrueFalseQuestion = require('../../app/model/base-types/implementations/TrueFalseQuestion');

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

test('Création d\'une question numérique', () => {
    const controller = new QuestionController();
    expect(controller.createNumeric('question', 2.45654)).toStrictEqual(new NumericQuestion('question', 2.45654));
    expect(QuestionCache.instance.questions).toStrictEqual([new NumericQuestion('question', 2.45654)]);
})

test('Création d\'une question à réponse courte', () => {
    const controller = new QuestionController();
    expect(controller.createShortAnswer('question', 'réponse courte de quelques mots')).toStrictEqual(new ShortAnswerQuestion('question', 'réponse courte de quelques mots'));
    expect(QuestionCache.instance.questions).toStrictEqual([new ShortAnswerQuestion('question', 'réponse courte de quelques mots')]);
})

test('Création d\'une question vrai/faux', () => {
    const controller = new QuestionController();
    expect(controller.createTrueFalse('question binaire', true)).toStrictEqual(new TrueFalseQuestion('question binaire', true));
    expect(QuestionCache.instance.questions).toStrictEqual([new TrueFalseQuestion('question binaire', true)]);
})