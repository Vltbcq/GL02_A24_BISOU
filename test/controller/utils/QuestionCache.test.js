const QuestionCache = require('../../../app/controller/utils/QuestionCache');

test('Récupération de l\'instance du cache des questions', () => {
    expect(QuestionCache.instance).not.toBeNull();
    expect(QuestionCache.instance).toBe(QuestionCache.instance);
})