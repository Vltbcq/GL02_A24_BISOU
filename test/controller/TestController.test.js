const Test = require('../../app/model/base-types/Test');
const Question = require('../../app/model/base-types/Question');
const TestController = require('../../app/controller/TestController');

test('Création d\'un examen', () => {
    const controller = new TestController();
    expect(controller.createTest()).toStrictEqual(new Test());
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
      expect(controller.testContainsQuestion(test, question)).toBe(true);
   });
test('Suppression d\'un examen', () => {
      const controller = new TestController();
      const test = new Test();
      controller.deleteTest(test);
      expect(test).toBe(null);
   });