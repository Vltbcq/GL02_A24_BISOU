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
    expect(QuestionCache.instance.questions).toEqual([new BlankWordQuestion('Partie 1', 'Partie 2', 'mot manquant')]);
});

test('Création d\'une question à choix multiples', () => {
    const controller = new QuestionController();
    expect(controller.createMultipleChoice('question', ['réponse fausse', 'réponse valide'], [1])).toStrictEqual(new MultipleChoiceQuestion('question', ['réponse fausse', 'réponse valide'], [1]));
    expect(QuestionCache.instance.questions).toEqual([new MultipleChoiceQuestion('question', ['réponse fausse', 'réponse valide'], [1])]);
})

test('Création d\'une question numérique', () => {
    const controller = new QuestionController();
    expect(controller.createNumeric('question', 2.45654)).toStrictEqual(new NumericQuestion('question', 2.45654));
    expect(QuestionCache.instance.questions).toEqual([new NumericQuestion('question', 2.45654)]);
})

test('Création d\'une question à réponse courte', () => {
    const controller = new QuestionController();
    expect(controller.createShortAnswer('question', 'réponse courte de quelques mots')).toStrictEqual(new ShortAnswerQuestion('question', 'réponse courte de quelques mots'));
    expect(QuestionCache.instance.questions).toEqual([new ShortAnswerQuestion('question', 'réponse courte de quelques mots')]);
})

test('Création d\'une question vrai/faux', () => {
    const controller = new QuestionController();
    expect(controller.createTrueFalse('question binaire', true)).toStrictEqual(new TrueFalseQuestion('question binaire', true));
    expect(QuestionCache.instance.questions).toEqual([new TrueFalseQuestion('question binaire', true)]);
})

test('Recherche filtrée par énoncés des questions', () => {
    const controller = new QuestionController();
    const numeric = controller.createNumeric("question numérique", 3);
    const short = controller.createShortAnswer("question à réponse courte", "réponse valide");
    controller.createTrueFalse("question binaire", true);
    expect(controller.search("numérique")).toEqual([numeric]);
    expect(controller.search("réponse courte")).toEqual([short]);
})

test('Recherche filtrée par type des questions', () => {
    const controller = new QuestionController();
    controller.createNumeric("question numérique", 3);
    const short = controller.createShortAnswer("question à réponse courte", "réponse valide");
    const trueFalse = controller.createTrueFalse("question binaire", true);
    expect(controller.search(undefined, 'Réponse courte')[0]).toEqual(short);
    expect(controller.search(undefined, 'Vrai/Faux')[0]).toEqual(trueFalse);
})