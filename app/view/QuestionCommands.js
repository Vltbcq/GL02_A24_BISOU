const NumericQuestion = require("../model/base-types/implementations/NumericQuestion");
const QuestionController = require("../controller/QuestionController");
const ShortAnswerQuestion = require("../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../model/base-types/implementations/TrueFalseQuestion");
const QuestionCache = require("../controller/utils/QuestionCache");
const BlankWordQuestion = require("../model/base-types/implementations/BlankWordQuestion");
const MultipleChoiceQuestion = require("../model/base-types/implementations/MultipleChoiceQuestion");
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
        .command('editquestion')
        .argument('<id>', 'The question ID')
        .argument('<editedText>','Text to edit')
        .option('--start','Option to edit the start of a blank word question')
        .option('--end','Option to edit the end of a blank word question')
        .description('Edit a question that already exists.')
        .action(function (id, editedText, options) {

            try{
                let question = QuestionCache.instance.getQuestion(id);

                if (question instanceof BlankWordQuestion) {
                    if (options.start){
                        controller.editBlankWord(question, editedText, 1);
                    } else if (options.end){
                        controller.editBlankWord(question, editedText, 2);
                    }
                    else{
                        console.log("No option has been selected.")
                    }

                } else if (question instanceof NumericQuestion || question instanceof ShortAnswerQuestion || question instanceof TrueFalseQuestion || question instanceof MultipleChoiceQuestion) {
                    controller.editQuestion(question, editedText);

                } else{
                    console.log("Unrecognized question type.");
                }
            } catch(error){
                console.error(error.message);
            }

        })

    program
        .command('editanswer')
        .argument('<id>', 'The question ID')
        .argument('<editedText>','Text to edit')
        .option('--answerset', 'Option to edit the answer set for multiple choice questions')
        .option('--correctanswer', 'Option to edit the correct answer among an answer set for multiple choice questions')
        .description('Edit an answer that already exists.')
        .action(function (id, editedText) {

            try{
                let question = QuestionCache.instance.getQuestion(id);

                if (question instanceof BlankWordQuestion) {
                    controller.editBlankWordAnswer(question, editedText);

                } else if (question instanceof NumericQuestion) {
                    let answer = parseFloat(editedText);
                    controller.editNumericAnswer(question, answer);

                } else if (question instanceof ShortAnswerQuestion) {
                    controller.editShortAnswerAnswer(question, editedText);

                } else if (question instanceof TrueFalseQuestion) {
                    if (editedText === 'true'){
                        controller.editTrueFalseAnswer(question, true);
                    } else if (answer === 'false'){
                        controller.editTrueFalseAnswer(question, false);
                    } else{
                        console.log("Please choose 'true' or 'false' for true/false question.");
                    }
                } else if (question instanceof MultipleChoiceQuestion) {
                    if (option.answerset) {
                        const answersetList = editedText.split(',').map(item => item.trim());
                        controller.editMultipleChoiceAnswerSet(question, answersetList);
                    } else if (option.correctanswer) {
                        const correctAnswers = editedText.split(',').map(item => item.trim());
                        const indexes = correctAnswers.map(answer => answers.indexOf(answer));
                        if (indexes.includes(-1)) {
                            console.warn("Be careful. Some of the answers you gave might not be in the answet set.")
                        }
                        controller.editMultipleChoiceCorrectAnswer(question, indexes);
                    } else {
                            console.log("No option has been selected. Please select an option (answerset or correctanswer) for multiple choice questions.")
                    }
                }
            } catch(error){
                console.error(error.message);
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