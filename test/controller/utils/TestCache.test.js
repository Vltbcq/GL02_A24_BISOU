const TestCache = require('../../../app/controller/utils/TestCache');

describe('TestCache', () => {
   test('Récupération de l\'instance du cache des tests', () => {
      expect(TestCache.instance).not.toBeNull();
      expect(TestCache.instance).toBe(TestCache.instance);
   });
});
