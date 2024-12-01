const TestCache = require("../../../app/controller/utils/TestCache");
const TestController = require("../../../app/controller/TestController");
const Test = require("../../../app/model/base-types/Test");
const ShortAnswerQuestion = require("../../../app/model/base-types/implementations/ShortAnswerQuestion");

describe("TestCache", () => {
  test("Récupération de l'instance du cache des tests", () => {
    expect(TestCache.instance).not.toBeNull();
    expect(TestCache.instance).toBe(TestCache.instance);
  });
});

test("Ajout d'un examen au cache", () => {
  const test = new Test();
  TestCache.instance.addTest(test);
  expect(TestCache.instance.tests).toContainEqual(test);
});

test("Suppression d'un examen du cache", () => {
  const test = new Test();
  TestCache.instance.addTest(test);
  TestCache.instance.removeTest(test);
  expect(TestCache.instance.tests).not.toContain(test);
});

test("Mise à jour d'un examen dans le cache", () => {
  let test = new Test();
  let question = new ShortAnswerQuestion("question 1", "reponse 1");
  TestCache.instance.addTest(test);
  // on cré une copie identique pour simuler une modification
  let updatedTest = test;
  updatedTest.addQuestion(question);
  TestCache.instance.updateTest(updatedTest);
  expect(TestCache.instance.tests).toContainEqual(updatedTest);
  expect(TestCache.instance.getTestById(updatedTest.id).questions).toEqual([
    question,
  ]);
});
