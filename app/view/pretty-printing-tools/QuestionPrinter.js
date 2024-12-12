require('../../model/base-types/Question');
const NumericQuestion = require("../../model/base-types/implementations/NumericQuestion");
const ShortAnswerQuestion = require("../../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../../model/base-types/implementations/TrueFalseQuestion");
const BlankWordQuestion = require("../../model/base-types/implementations/BlankWordQuestion");
const MultipleChoiceQuestion = require("../../model/base-types/implementations/MultipleChoiceQuestion");

/**
 * Retourne sous forme de string les informations concernant une question
 * @param question {Question} - Question à afficher
 * @return {string} - Chaîne de caractères "human readable"
 */
function prettyQuestion(question) {
    const questionString = `Question id ${question.id} : ${question.question}`;
    let answerString = "Correct answer : ";
    if (question instanceof NumericQuestion || question instanceof ShortAnswerQuestion || question instanceof TrueFalseQuestion) {
        answerString += `\n${question.answer}`;
    } else if (question instanceof BlankWordQuestion) {
        answerString += `\n${question.blankWord}`;
    } else if (question instanceof MultipleChoiceQuestion) {
        answerString = `Possible answers :`;
        for (const answer of question.answerSet) {
            answerString += `\n- ${answer}`;
        }
        answerString += `\nCorrect answers :`;
        for (const correctAnswer of question.correctAnswers) {
            answerString += `\n- ${correctAnswer}`;
        }
    }
    return `${questionString}\n${answerString}`;
}

/**
 * Retourne sous forme de string les informations concernant une série de questions
 * @param questions {Question[]} - Les questions à afficher
 * @return {string} - Chaîne de caractères "human readable"
 */
function prettyQuestionList(questions) {
    const separator = "\n--------------------------------------------------";
    let message = "Questions in memory :";
    for (const question of questions) {
        message += `${separator}\n${prettyQuestion(question)}`;
    }
    return message;
}

module.exports = {
    prettyQuestionList : prettyQuestionList
}