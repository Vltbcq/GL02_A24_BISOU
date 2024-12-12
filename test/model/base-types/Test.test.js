const Test = require('../../../app/model/base-types/Test');
const NumericQuestion = require('../../../app/model/base-types/implementations/NumericQuestion');
const ShortAnswerQuestion = require('../../../app/model/base-types/implementations/ShortAnswerQuestion');
const VCardController = require('../../../app/controller/VCardController')

test('Initialisation d\'un examen', () => {
    expect(new Test().questionNumber).toBe(0)
    expect(new Test().containsQuestion(new NumericQuestion('question', 2))).toBeFalsy()
})

test('Calcul du nombre de questions', () => {
    let test = new Test()
    expect(test.questionNumber).toBe(0);
    test.addQuestion(new NumericQuestion('question', 4));
    expect(test.questionNumber).toBe(1);
    test.addQuestion(new ShortAnswerQuestion('question', 'answer'));
    expect(test.questionNumber).toBe(2);
})

test('Ajout de questions', () => {
    let test = new Test()
    expect(test.containsQuestion(new NumericQuestion('question', 4))).toBeFalsy()
    test.addQuestion(new NumericQuestion('question', 4));
    expect(test.containsQuestion(new NumericQuestion('question', 4))).toBeTruthy()
})

test('Suppression de questions', () => {
    let test = new Test()
    test.addQuestion(new NumericQuestion('question', 4));
    expect(test.questionNumber).toBe(1);
    expect(test.containsQuestion(new NumericQuestion('question', 4))).toBeTruthy()
    test.removeQuestion(new NumericQuestion('question', 4));
    expect(test.questionNumber).toBe(0);
    expect(test.containsQuestion(new NumericQuestion('question', 4))).toBeFalsy()
})

test("Validité d'un examen", () => {
    let test = new Test();
    for (let i = 0; i < 20; i++) {
        test.addQuestion(new NumericQuestion('question', i));
    }
    expect(test.isValid()).toBeFalsy()
})