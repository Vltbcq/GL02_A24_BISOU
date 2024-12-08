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
    expect(controller.createBlankWord('Partie 1', 'Partie 2', 'mot manquant').equal(new BlankWordQuestion('Partie 1', 'Partie 2', 'mot manquant'))).toBeTruthy();
});

test('Création d\'une question à choix multiples', () => {
    const controller = new QuestionController();
    expect(controller.createMultipleChoice('question', ['réponse fausse', 'réponse valide'], [1]).equal(new MultipleChoiceQuestion('question', ['réponse fausse', 'réponse valide'], [1]))).toBeTruthy();
});

test('Création d\'une question numérique', () => {
    const controller = new QuestionController();
    expect(controller.createNumeric('question', 2.45654).equal(new NumericQuestion('question', 2.45654))).toBeTruthy();
});

test('Création d\'une question à réponse courte', () => {
    const controller = new QuestionController();
    expect(controller.createShortAnswer('question', 'réponse courte de quelques mots').equal(new ShortAnswerQuestion('question', 'réponse courte de quelques mots'))).toBeTruthy();
});

test('Création d\'une question vrai/faux, vérification de la question', () => {
    const controller = new QuestionController();
    expect(controller.createTrueFalse('question binaire', true).equal(new TrueFalseQuestion('question binaire', true))).toBeTruthy();
});

test('Modification de la partie 1 d\' une question à mot manquant', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createBlankWord('Partie 1', 'Partie 2', 'mot manquant');
    controller.editBlankWord(testQuestion, 'nouvelle partie 1', 1);
    expect(testQuestion._textPart1).toEqual('nouvelle partie 1');
});

test('Modification de la partie 2 d\' une question à mot manquant', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createBlankWord('Partie 1', 'Partie 2', 'mot manquant');
    controller.editBlankWord(testQuestion, 'nouvelle partie 2', 2);
    expect(testQuestion._textPart2).toEqual('nouvelle partie 2');
});


test('Modification d\'une question à mot manquant', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createBlankWord('Partie 1', 'Partie 2', 'mot manquant');
    controller.editBlankWordAnswer(testQuestion, 'nouvelle réponse');
    expect(testQuestion._blankWord).toEqual('nouvelle réponse');
});

test('Modification d\'une question à choix multiple', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createMultipleChoice('question', ['réponse fausse', 'réponse valide'], [1]);
    controller.editQuestion(testQuestion, "autre question");
    expect(testQuestion._question).toEqual("autre question");
})

test('Modification du set de questions pour une question à choix multiples', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createMultipleChoice('question', ['réponse fausse', 'réponse valide'], [1]);
    controller.editMultipleChoiceAnswerSet(testQuestion, 'autre réponse fausse, autre réponse valide');
    expect(testQuestion._answerSet).toEqual(['autre réponse fausse', 'autre réponse valide']);
})

test('Modification des réponses correctes pour une question à choix multiples', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createMultipleChoice('question', ['réponse fausse', 'réponse valide'], [1]);
    controller.editMultipleChoiceCorrectAnswer(testQuestion, 'réponse valide');
    expect(testQuestion._correctAnswers).toEqual([1]);
})

test('Modification d\'une question numérique', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createNumeric('question', 2.123);
    controller.editQuestion(testQuestion, 'nouvelle question');
    expect(testQuestion._question).toEqual('nouvelle question');
});

test('Modification d\'une réponse à une question numérique', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createNumeric('question', 2.123);
    controller.editNumericAnswer(testQuestion, -3.212);
    expect(testQuestion._answer).toEqual(-3.212);
});


test('Modification d\'une question à réponse courte', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createShortAnswer('question', 'réponse courte');
    controller.editQuestion(testQuestion, 'nouvelle question');
    expect(testQuestion._question).toEqual('nouvelle question');
});

test('Modification d\'une réponse à une question à réponse courte', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createShortAnswer('question', 'réponse courte');
    controller.editShortAnswerAnswer(testQuestion, 'nouvelle réponse');
    expect(testQuestion._answer).toEqual('nouvelle réponse');
});


test('Modification d\'une question vrai/faux', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createTrueFalse('question binaire', true);
    controller.editQuestion(testQuestion, 'nouvelle question');
    expect(testQuestion._question).toEqual('nouvelle question');
});

test('Modification d\'une réponse à une question vrai/faux', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createTrueFalse('question binaire', true);
    controller.editTrueFalseAnswer(testQuestion, false);
    expect(testQuestion._answer).toEqual(false);
});

test('Vérification de l\'état de la question après modification dans le cache', () => {
    const controller = new QuestionController();
    let testQuestion = controller.createTrueFalse('question binaire', true);
    let id_question = testQuestion._id;
    controller.editTrueFalseAnswer(testQuestion, false);
    expect(testQuestion._answer).toEqual(false);
    expect(QuestionCache.instance.getQuestion(id_question).equal(new TrueFalseQuestion('question binaire', false))).toBeTruthy();
});

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

test("Suppression d'une question", () => {
    const controller = new QuestionController();
    let testQuestion = controller.createTrueFalse('question à supprimer', true);
    controller.deleteQuestion(testQuestion);
    expect(QuestionCache.instance.questions).toEqual([]);
});
  