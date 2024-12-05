const NumericQuestion = require("../model/base-types/implementations/NumericQuestion");
const QuestionController = require("../controller/QuestionController");
const ShortAnswerQuestion = require("../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../model/base-types/implementations/TrueFalseQuestion");
const {prettyQuestionList} = require("./pretty-printing-tools/QuestionPrinter");
const logger = require("../security/Logger");

/**
 * Ajoute les commandes liées aux questions à un programme
 * @param program - Programme commander auquel les commandes seront ajoutées
 */
function addQuestionCommands(program) {

    const controller = new QuestionController();
    program
        .command('mkquestion')
        .description("Create a new question")
        .argument('<type>', 'The type of the question')
        .argument('<question>', 'The wording of the question')
        .argument('<answer>', 'The correct answer of the question (yes/y or no/n)') // c'est un mensonge mais c'est pas grave
        .action((type, question, answer) => {
            logger.info(`Execution of mkquestion command with the following parameters : [type : ${type}; question : ${question}, answer : ${answer}`);
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
        .option('-q, --question <question>', 'Defines a substring we are looking for in the wording of the question')
        .option('-t, --type <type>', 'The type of the question')
        .action((options) => {
            logger.info("Execution of showquestion command");
            let questions = controller.search(options.question, options.type);
            console.log(prettyQuestionList(questions));
        })
}

module.exports = addQuestionCommands;