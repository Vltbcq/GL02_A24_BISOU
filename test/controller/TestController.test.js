const Test = require("../../app/model/base-types/Test");
const ShortAnswerQuestion = require("../../app/model/base-types/implementations/ShortAnswerQuestion");
const NumericQuestion = require("../../app/model/base-types/implementations/NumericQuestion");
const TrueFalseQuestion = require("../../app/model/base-types/implementations/TrueFalseQuestion");
const MultipleChoiceQuestion = require("../../app/model/base-types/implementations/MultipleChoiceQuestion");
const BlankWordQuestion = require("../../app/model/base-types/implementations/BlankWordQuestion");
const TestController = require("../../app/controller/TestController");
const TestCache = require("../../app/controller/utils/TestCache");

beforeEach(() => {
  // Ne pas faire ce genre de modifications dans un cas normal, on le fait ici uniquement pour préserver l'individualité des tests
  TestCache.instance._tests = [];
});

test("Création d'un examen", () => {
  const controller = new TestController();
  const test = controller.createTest();
  expect(test).toBeInstanceOf(Test);
  expect(TestCache.instance.tests).toEqual([test]);
});
test("Ajout d'une question à un examen", () => {
  const controller = new TestController();
  const test = controller.createTest();
  const question = new ShortAnswerQuestion("test", "test");
  controller.addQuestionToTest(test, question);
  expect(test.questions).toEqual([question]);
});
test("Suppression d'une question d'un examen", () => {
  const controller = new TestController();
  const test = controller.createTest();
  const question = new ShortAnswerQuestion("test", "test");
  controller.addQuestionToTest(test, question);
  controller.removeQuestionFromTest(test, question);
  expect(test.questions).toEqual([]);
});
test("Vérification de la présence d'une question dans un examen", () => {
  const controller = new TestController();
  const test = controller.createTest();
  const question = new ShortAnswerQuestion("test", "test");
  controller.addQuestionToTest(test, question);
  expect(controller.testContainsQuestion(test, question)).toBeTruthy();
});
test("Suppression d'un examen", () => {
  const controller = new TestController();
  const test = controller.createTest();
  controller.deleteTest(test);
  expect(TestCache.instance.tests).toEqual([]);
});

test("Compte des questions pour chaque type", () => {
  const controller = new TestController();
  const test = controller.createTest();
  for (let i = 0; i < 5; i++){
    test.addQuestion(new NumericQuestion('question', i));
    test.addQuestion(new TrueFalseQuestion(`question ${i}`, true));
    test.addQuestion(new ShortAnswerQuestion('question', `réponse ${i}`));
  }
  expect(controller.countStats(test)).toEqual([5,0,5,5,0]);
});

test("Calcul des proportions des questions pour chaque type", () => {
  const controller = new TestController();
  const test = controller.createTest();
  for (let i = 0; i < 5; i++){
    test.addQuestion(new NumericQuestion('question', i));
    test.addQuestion(new TrueFalseQuestion(`question ${i}`, true));
    test.addQuestion(new ShortAnswerQuestion('question', `réponse ${i}`));
    test.addQuestion(new BlankWordQuestion("blabla", "blabla2", `${i}`));
  }
  expect(controller.avgStats(test)).toEqual([0.25,0.25,0.25,0.25,0]);
});

test("Calcul des proportions des questions pour chaque type sur plusieurs tests", () => {
  const controller = new TestController();
  const test1 = controller.createTest();
  const test2 = controller.createTest();
  let tests = [test1, test2];
  for (let i = 0; i < 10; i++){
    test1.addQuestion(new NumericQuestion('question', i));
    test1.addQuestion(new TrueFalseQuestion(`question ${i}`, true));
  };
  for (let i = 0; i < 10; i++){
    test2.addQuestion(new ShortAnswerQuestion('question', `réponse ${i}`));
    test2.addQuestion(new BlankWordQuestion("blabla", "blabla2", `${i}`));
  };
  expect(controller.globalAvgStats(tests)).toEqual([0.25,0.25,0.25,0.25,0]);
});

test("Calcul des proportions des questions pour chaque type", () => {
  const controller = new TestController();
  const test = controller.createTest();
  for (let i = 0; i < 5; i++){
    test.addQuestion(new NumericQuestion('question', i));
    test.addQuestion(new TrueFalseQuestion(`question ${i}`, true));
    test.addQuestion(new ShortAnswerQuestion('question', `réponse ${i}`));
    test.addQuestion(new BlankWordQuestion("blabla", "blabla2", `${i}`));
  }
  expect(controller.avgStats(test)).toEqual([0.25,0.25,0.25,0.25,0]);
});