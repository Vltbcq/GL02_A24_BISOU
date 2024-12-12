const NumericQuestion = require("../model/base-types/implementations/NumericQuestion");
const QuestionController = require("../controller/QuestionController");
const ShortAnswerQuestion = require("../model/base-types/implementations/ShortAnswerQuestion");
const TrueFalseQuestion = require("../model/base-types/implementations/TrueFalseQuestion");
const QuestionCache = require("../controller/utils/QuestionCache");
const TestController = require("../controller/TestController");
const TestCache = require("../controller/utils/TestCache");
const BlankWordQuestion = require("../model/base-types/implementations/BlankWordQuestion");
const MultipleChoiceQuestion = require("../model/base-types/implementations/MultipleChoiceQuestion");
const {prettyQuestionList} = require("./pretty-printing-tools/QuestionPrinter");
const logger = require("../security/Logger");
const inquirer = require("inquirer").default;

// Chaînes de référence pour les types de questions
const shortAnswerString = "short answer";
const trueFalseString = "true/false";
const multipleChoiceString = "multiple choice";
const blankWordString = "gapfill";
const numericString = "numeric";

/*
 * Dictionnaire associant les types de questions à leur classe respective
 */
const questionTypes = {
    [shortAnswerString]: ShortAnswerQuestion.questionType,
    [trueFalseString]: TrueFalseQuestion.questionType,
    [multipleChoiceString]: MultipleChoiceQuestion.questionType,
    [blankWordString]: BlankWordQuestion.questionType,
    [numericString]: NumericQuestion.questionType
}


/**
 * Ajoute les commandes liées aux questions à un programme
 * @param program - Programme commander auquel les commandes seront ajoutées
 */
function addQuestionCommands(program) {
    const controller = new QuestionController();
    const testController = new TestController();
    program
        .command("mkquestion")
        .description("Create a new question")
        .argument('<type>', `The type of the question, choose among ${shortAnswerString}, ${trueFalseString}, ${multipleChoiceString}, ${blankWordString} and ${numericString}`)
        .argument('<question>', "The wording of the question, for a ${blankWordString} question, write the frase to complete, insert [gap] at the position of the missing word : 'This is a [gap] question' ")
        .argument('<answer>', `The correct answer of the question, please notice the following instructions :\nUse yes/y or no/n if it is a ${trueFalseString} question\nFor a ${multipleChoiceString} question separate the answer set and the correct answer set with a colon 'possibleAnswers:correctAnswers', and separate the answers with a comma ','`)
        .action(async (type, question, answer) => {
            logger.info(`Execution of mkquestion command with the following parameters : [type : ${type}; question : ${question}, answer : ${answer}`);
            if (type === numericString) {
                controller.createNumeric(question, parseInt(answer))
            } else if (type === shortAnswerString) {
                controller.createShortAnswer(question, answer)
            } else if (type === trueFalseString) {
                controller.createTrueFalse(question, answer === 'yes' || answer === 'y')
            } else if (type === multipleChoiceString) {
                // On sépare les options de réponse et les réponses correctes
                const answers = answer.split(':').map(item => item.trim());
                const answerSetString = answers[0];
                const correctAnswerSetString = answers[1];

                // On découpe les différentes options en tableaux
                const answerSetList = answerSetString.split(',').map(item => item.trim());
                const correctAnswerSetList = correctAnswerSetString.split(',').map(item => item.trim());

                controller.createMultipleChoice(question, answerSetList, correctAnswerSetList);
            } else if (type === blankWordString) {
                const { instruction } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'instruction',
                        message: 'Please provide instructions for the question:',
                    },
                ]);
                const questionTexts = question.split("[gap]").map(item => item.trim());
                controller.createBlankWord(instruction,questionTexts[0], questionTexts[1], answer);
            }
            console.log("A new question has been created");
        });

    program
        .command('editquestion')
        .argument('<id>', 'The question ID')
        .argument('<editedText>', 'Text to edit')
        .option('--question', 'Option to edit the question of a blank word question')
        .option('--start', 'Option to edit the start of a blank word question')
        .option('--end', 'Option to edit the end of a blank word question')
        .description('Edit a question that already exists.')
        .action(function (id, editedText, options) {

            try {
                let question = QuestionCache.instance.getQuestion(parseInt(id));

                if (question instanceof BlankWordQuestion) {
                    if (options.start) {
                        controller.editBlankWord(question, editedText, 1);
                    } else if (options.end) {
                        controller.editBlankWord(question, editedText, 2);
                    }else if (options.question){
                        controller.editQuestion(question, editedText);
                    } else {
                        console.log("No option has been selected.")
                    }

                } else if (question instanceof NumericQuestion || question instanceof ShortAnswerQuestion || question instanceof TrueFalseQuestion || question instanceof MultipleChoiceQuestion) {
                    controller.editQuestion(question, editedText);

                } else {
                    console.log("Unrecognized question type.");
                }

                QuestionCache.instance.saveEdition();
                console.log(`Question ${id} has been edited`);
            } catch (error) {
                console.error(error.message);
            }

        })

    program
        .command('editanswer')
        .argument('<id>', 'The question ID')
        .argument('<editedText>', 'Text to edit')
        .option('--answerset', 'Option to edit the answer set for multiple choice questions')
        .option('--correctanswer', 'Option to edit the correct answer among an answer set for multiple choice questions')
        .description('Edit an answer that already exists.')
        .action(function (id, editedText) {

            try {
                let question = QuestionCache.instance.getQuestion(parseInt(id));

                if (question instanceof BlankWordQuestion) {
                    controller.editBlankWordAnswer(question, editedText);

                } else if (question instanceof NumericQuestion) {
                    let answer = parseFloat(editedText);
                    controller.editNumericAnswer(question, answer);

                } else if (question instanceof ShortAnswerQuestion) {
                    controller.editShortAnswerAnswer(question, editedText);

                } else if (question instanceof TrueFalseQuestion) {
                    if (editedText === 'true') {
                        controller.editTrueFalseAnswer(question, true);
                    } else if (answer === 'false') {
                        controller.editTrueFalseAnswer(question, false);
                    } else {
                        console.log("Please choose 'true' or 'false' for true/false question.");
                    }
                } else if (question instanceof MultipleChoiceQuestion) {
                    if (option.answerset) {
                        controller.editMultipleChoiceAnswerSet(question, editedText);
                    } else if (option.correctanswer) {
                        controller.editMultipleChoiceCorrectAnswer(question, editedText);
                    } else {
                        console.log("No option has been selected. Please select an option (answerset or correctanswer) for multiple choice questions.")
                    }
                }

                QuestionCache.instance.saveEdition();
                console.log(`Question ${id} has been edited`);
            } catch(error){
                console.error(error.message);
            }
        })

    program
        .command('showquestions')
        .description("Show the questions available")
        .option('-q, --question <question>', 'Defines a substring we are looking for in the wording of the question')
        .option('-t, --type <type>', `The type of the question, choose among ${shortAnswerString}, ${trueFalseString}, ${multipleChoiceString}, ${blankWordString} and ${numericString}`)
        .action((options) => {
            logger.info(`Execution of showquestion command, filtered with question as ${options.question} and type as ${options.type}`);
            let questions = controller.search(options.question, questionTypes[options.type]);
            console.log(prettyQuestionList(questions));
        });

    program
        .command("selectquestions")
        .description("Select multiple questions to add to a test")
        .option(
            "-q, --question <question>",
            "Defines a substring we are looking for in the wording of the question"
        )
        .option("-t, --type <type>", "The type of the question")
        .action(async (options) => {
            logger.info(
                `Execution of selectquestion command, filtered with question as ${options.question} and type as ${options.type}`
            );
            let questions = controller.search(options.question, options.type);
            let questionChoices = questions.map((q) => ({
                name: q.question,
                value: q.id,
            }));

            const answers = await inquirer.prompt([
                {
                    type: "checkbox",
                    name: "selectedQuestions",
                    message: "Select questions to add to the test",
                    choices: questionChoices,
                },
                {
                    type: "input",
                    name: "testId",
                    message: "Enter the ID of the test you want to add the questions to",
                },
            ]);
            for (const questionId of answers.selectedQuestions) {
                const test = TestCache.instance.getTestById(parseInt(answers.testId));
                const question = QuestionCache.instance.getQuestion(parseInt(questionId));
                testController.addQuestionToTest(test, question);
            }
            console.log(`Questions added to test ${answers.testId}`);
        });

   program
      .command('rmquestion')
      .argument('<id>', 'The question ID')
      .description("Delete a question")
      .action(async function (id) {
         try {
            const { confirm } = await inquirer.prompt([
               {
                  type: 'confirm',
                  name: 'confirm',
                  message: 'Are you sure you want to delete this question?',
               },
            ]);

            if (confirm) {
               let question = QuestionCache.instance.getQuestion(parseInt(id));
               controller.deleteQuestion(question);
               QuestionCache.instance.saveEdition();
               console.log('Question deleted successfully.');
               logger.info(`Question with ID ${id} has been deleted.`);
            } else {
               console.log('Question deletion canceled.');
               logger.info('Question deletion canceled.');
            }
         } catch (error) {
            console.error(error.message);
         }
      })
}

module.exports = addQuestionCommands;
