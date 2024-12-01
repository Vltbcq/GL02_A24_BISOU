require('../../model/base-types/Question');
const NumericQuestion = require("../../model/base-types/implementations/NumericQuestion");
const ShortAnswerQuestion = require("../../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../../model/base-types/implementations/TrueFalseQuestion");
const BlankWordQuestion = require("../../model/base-types/implementations/BlankWordQuestion");
const MultipleChoiceQuestion = require("../../model/base-types/implementations/MultipleChoiceQuestion");

/**
 * Affiche dans le terminal les informations concernant une question
 * @param question {Question} - Question à afficher
 */
function printQuestion(question) {
    const questionString = `Question : ${question.question}`;
    let answerString = "Correct answer : ";
    if (question instanceof NumericQuestion
        || question instanceof ShortAnswerQuestion
        || question instanceof TrueFalseQuestion) {
        answerString += `\n${question.answer}`;
    }
    else if (question instanceof BlankWordQuestion) {
        answerString += `\n${question.blankWord}`;
    }
    else if (question instanceof MultipleChoiceQuestion) {
        for (const answer of question.correctAnswers) {
            answerString += `\n- ${answerString}`;
        }
    }
    console.log(`${questionString}\n${answerString}`);
}

module.exports = printQuestion;