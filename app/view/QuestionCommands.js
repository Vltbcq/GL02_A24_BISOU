const NumericQuestion = require("../model/base-types/implementations/NumericQuestion");
const QuestionController = require("../controller/QuestionController");
const ShortAnswerQuestion = require("../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../model/base-types/implementations/TrueFalseQuestion");
const {prettyQuestionList} = require("./pretty-printing-tools/QuestionPrinter");

function addQuestionCommands(program) {

    const controller = new QuestionController();
    program
        .command('mkquestion')
        .description("Create a new question")
        .argument('<type>', 'The type of the question')
        .argument('<question>', 'The wording of the question')
        .argument('<answer>', 'The correct answer of the question')
        .action((type, question, answer) => {
            if (type === NumericQuestion.questionType) {
                controller.createNumeric(question, parseInt(answer))
            } else if (type === ShortAnswerQuestion.questionType) {
                controller.createShortAnswer(question, answer)
            } else if (type === TrueFalseQuestion.questionType) {
                controller.createTrueFalse(question, answer === 'yes' || answer === 'y')
            }
        })

    program
        .command('showquestions')
        .description("Show the questions available")
        .action(() => {
            let questions = controller.readAll();
            console.log(prettyQuestionList(questions));
        })
}

module.exports = addQuestionCommands;