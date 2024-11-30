const Test = require("../../app/model/base-types/Test");
const ShortAnswerQuestion = require("../../app/model/base-types/implementations/ShortAnswerQuestion");
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
