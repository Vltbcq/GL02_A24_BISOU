const ESSerializer = require("esserializer");
const Question = require("../../model/base-types/Question");
const Test = require("../../model/base-types/Test");
const NumericQuestion = require("../../model/base-types/implementations/NumericQuestion");
const BlankWordQuestion = require("../../model/base-types/implementations/BlankWordQuestion");
const ShortAnswerQuestion = require("../../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../../model/base-types/implementations/TrueFalseQuestion");
const MultipleChoiceQuestion = require("../../model/base-types/implementations/MultipleChoiceQuestion");

/**
 * Enregistre dans ESSerializer toutes les classes qu'il doit pouvoir sérialiser et désérialiser
 */
function registerAllClasses() {
    ESSerializer.registerClass(Question)
    ESSerializer.registerClass(Test);
    ESSerializer.registerClass(NumericQuestion);
    ESSerializer.registerClass(BlankWordQuestion);
    ESSerializer.registerClass(ShortAnswerQuestion);
    ESSerializer.registerClass(TrueFalseQuestion);
    ESSerializer.registerClass(MultipleChoiceQuestion);
}

module.exports = registerAllClasses;