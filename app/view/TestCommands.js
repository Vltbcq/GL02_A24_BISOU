const TestController = require('../controller/TestController');
const {prettyTestList} = require('./pretty-printing-tools/TestPrinter');
const QuestionCache = require('../controller/utils/QuestionCache');
const TestCache = require('../controller/utils/TestCache');
const inquirer = require('inquirer').default;
const Table = require('cli-table3');
const figlet = require('figlet');
const MultipleChoiceQuestion = require('../model/base-types/implementations/MultipleChoiceQuestion');
const TrueFalseQuestion = require('../model/base-types/implementations/TrueFalseQuestion');
const NumericQuestion = require('../model/base-types/implementations/NumericQuestion');
const ShortAnswerQuestion = require('../model/base-types/implementations/ShortAnswerQuestion');
const BlankWordQuestion = require('../model/base-types/implementations/BlankWordQuestion');
const logger = require("../security/Logger");

function addTestCommands(program) {

    const controller = new TestController();
    program
        .command('mktest')
        .description("Create a new test with the ids of initial questions")
        .argument('[questionsIds...]', "The ids of the initial questions of the test, space between ids. ex : '0 1 2 3'  will add question 1 to 4", [])
        .action((questionsIds = []) => {
            const test = controller.createTest();
            questionsIds.forEach(id => {
                const question = QuestionCache.instance.getQuestion(parseInt(id));
                if (question) {
                    controller.addQuestionToTest(test, question);
                } else {
                    console.log(`Question with id ${id} not found.`);
                }
            });
            console.log(`Test created with id ${test.id}.`);
        })
    program
        .command('showtests')
        .description("Show the tests available")
        .action(() => {
            let tests = controller.readAll();
            console.log(prettyTestList(tests));
        })

    program
        .command('rmtest')
        .description("Delete a test")
        .argument('<id>', 'The id of the test to delete')
        .action(async (id) => {
            const test = TestCache.instance.getTestById(parseInt(id));
            if (test) {
                const { confirm } = await inquirer.prompt([{
                    type: 'confirm',
                    name: 'confirm',
                    message: `Are you sure you want to delete the test with id ${id}?`,
                }]);
                if (confirm) {
                    controller.deleteTest(test);
                    console.log(`Test with id ${id} deleted.`);
                    logger.info(`Test with id ${id} deleted.`);
                } else {
                    console.log(`Deletion of test with id ${id} canceled.`);
                    logger.info(`Deletion of test with id ${id} canceled.`);
                }
            } else {
                console.log(`Test with id ${id} not found.`);
            }
        })
    program
        .command('editest')
        .description("Edit a test")
        .argument('<id>', 'The id of the test to edit')
        .argument('<questionId>', 'The id of the question to add or remove')
        .action(async (id, questionId) => {
            const test = TestCache.instance.getTestById(parseInt(id));
            if (!test) {
                console.log(`Test with id ${id} not found.`);
                return;
            }

            const { action } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Do you want to add or remove the question?',
                    choices: ['Add', 'Remove']
                }
            ]);
            const question = QuestionCache.instance.getQuestion(parseInt(questionId));
            if (!question) {
                console.log(`Question with id ${questionId} not found.`);
                return;
            }
            if (action === 'Add') {
                controller.addQuestionToTest(test, question);
                console.log(`Question with id ${questionId} added to test ${id}.`);
            } else if (action === 'Remove') {
                controller.removeQuestionFromTest(test, question);
                console.log(`Question with id ${questionId} removed from test ${id}.`);
            }
        })
            
    program
        .command('linkvcard')
        .description("Link a vcard to a test")
        .argument('<vcard_id>', 'vCard ID')
        .argument('<test_id>', 'Test ID')
        .action((vcard_id, test_id) => {
            try{
                logger.info(`Execution of linkvcard.`);
                const test = TestCache.instance.getTestById(parseInt(test_id));
                test.addVCardToTest(vcard_id);
                console.log(`${vcard_id}.vcf get linked to test ${test_id}.`);
                TestCache._instance.updateTest(test);
            } catch(error){
                console.error(error.message);
            }
        })

        program
            .command('profile')
            .description('Create a visualization of test profile')
            .argument('<id>', 'ID of the test you want to get the test profile')
            .action((id) => {
                try{
                    let tests = controller.readAll()
                    controller.testProfile(parseInt(id), tests);
                    logger.info("Visualization of test profile has been created")
                } catch(error){
                    logger.error(error.message);
                }
                
            })

        program
            .command('comparison')
            .description('Create a visualization of test comparisons')
            .argument('<id>','ID of the test you want to compare')
            .action((id) => {
                try{
                    let tests = controller.readAll();
                    let valid_tests = tests.filter(test => test.isValid());
                    controller.compare(parseInt(id), valid_tests);
                    logger.info("Visualization of test comparisons has been created")
                } catch(error){
                    logger.error(error.message);
                }
            })
        
    program
        .command('simultest')
        .description("Simulate a verified test")
        .argument('<id>', 'The id of the test to simulate')
        .action(async (id) => {
            const test = controller.readAll().find(t => t.id === parseInt(id));
            if (!test) {
                console.log(`Test with id ${id} not found.`);
                return;
            }
            if (!test.isValid) {
                console.log(`Test with id ${id} is not valid.`);
                return;
            }

            let score = 0;
            const results = [];

            for (const question of test.questions) {
                let answer;
                if (question instanceof MultipleChoiceQuestion) {
                    answer = await inquirer.prompt([{
                        type: 'checkbox',
                        name: 'userAnswer',
                        message: question.question,
                        choices: question.answerSet
                    }]);
                } else if (question instanceof TrueFalseQuestion) {
                    answer = await inquirer.prompt([{
                        type: 'confirm',
                        name: 'userAnswer',
                        message: question.question
                    }]);
                } else if (question instanceof NumericQuestion) {
                    answer = await inquirer.prompt([{
                        type: 'number',
                        name: 'userAnswer',
                        message: question.question
                    }]);
                } else if (question instanceof ShortAnswerQuestion) {
                    answer = await inquirer.prompt([{
                        type: 'input',
                        name: 'userAnswer',
                        message: question.question
                    }]);
                } else if (question instanceof BlankWordQuestion) {
                    answer = await inquirer.prompt([{
                        type: 'input',
                        name: 'userAnswer',
                        message: `${question.question}\n${question.textPart1} .... ${question.textPart2}`
                    }]);
                } else {
                    console.log(`Unknown question type for question: ${question.question}`);
                    continue;
                }

                let isCorrect = false;
                if (question instanceof TrueFalseQuestion) {
                    isCorrect = answer.userAnswer === question.answer;
                }
                if (question instanceof MultipleChoiceQuestion) {
                    isCorrect = question.correctAnswers.length === answer.userAnswer.length &&
                        question.correctAnswers.every((val, index) => val === answer.userAnswer[index]);
                }
                if (question instanceof NumericQuestion) {
                    isCorrect = question.answer === answer.userAnswer;
                }
                if (question instanceof BlankWordQuestion) {
                    isCorrect = question.blankWord === answer.userAnswer;
                }
                if (question instanceof ShortAnswerQuestion) {
                    isCorrect = question.answer && answer.userAnswer.toString().toLowerCase() === question.answer.toString().toLowerCase();
                }
                results.push({
                    question: question.question,
                    userAnswer: question instanceof MultipleChoiceQuestion ? answer.userAnswer.join(', ') : answer.userAnswer,
                    correctAnswer: question instanceof MultipleChoiceQuestion ? question.correctAnswers.join(', ') :
                                   question instanceof BlankWordQuestion ? question.blankWord :
                                   question.answer,
                    isCorrect: isCorrect
                });

                if (isCorrect) {
                    score++;
                }
            }

            const terminalWidth = process.stdout.columns;
            const colWidth = Math.floor(terminalWidth / 4) - 1;

            const table = new Table({
                head: ['Result', 'Questions', 'User Answers', 'Correct Answers'],
                colWidths: [colWidth, colWidth, colWidth, colWidth]
            });

            results.forEach(result => {
                table.push([
                    result.isCorrect ? 'Correct' : 'Incorrect',
                    result.question,
                    result.userAnswer,
                    result.correctAnswer
                ]);
            });

            console.log(table.toString());
            figlet(`Score : ${score}/${test.questions.length}`, (err, data) => {
                if (err) {
                    logger.error('Something went wrong...', err);
                    console.dir(err);
                    return;
                }
                console.log(data);
            });
        });
}
module.exports = addTestCommands;
