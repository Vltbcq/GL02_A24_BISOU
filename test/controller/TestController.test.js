const Test = require('../../app/model/base-types/Test');
const Question = require('../../app/model/base-types/Question');
const TestController = require('../../app/controller/TestController');
const TestCache = require('../../app/controller/utils/TestCache');

beforeEach(() => {
   // Ne pas faire ce genre de modifications dans un cas normal, on le fait ici uniquement pour préserver l'individualité des tests
   TestCache.instance._tests = [];
})

test('Création d\'un examen', () => {
    const controller = new TestController();
    expect(controller.createTest()).toStrictEqual(new Test());
    expect(TestCache.instance.tests).toStrictEqual([new Test()]);
});
test('Ajout d\'une question à un examen', () => {
      const controller = new TestController();
      const test = new Test();
      const question = new Question();
      controller.addQuestionToTest(test, question);
      expect(test.questions).toStrictEqual([question]);

   });
test('Suppression d\'une question d\'un examen', () => {
      const controller = new TestController();
      const test = new Test();
      const question = new Question();
      controller.addQuestionToTest(test, question);
      controller.removeQuestionFromTest(test, question);
      expect(test.questions).toStrictEqual([]);
   });
test('Vérification de la présence d\'une question dans un examen', () => {
      const controller = new TestController();
      const test = new Test();
      const question = new Question();
      controller.addQuestionToTest(test, question);
      expect(controller.testContainsQuestion(test, question)).toBeTruthy();
   });
test('Suppression d\'un examen', () => {
      const controller = new TestController();
      const test = controller.createTest();
      controller.deleteTest(test);
      expect(TestCache.instance.tests).toStrictEqual([]);
   });