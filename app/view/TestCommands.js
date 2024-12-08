const TestController = require('../controller/TestController');
const Test = require('../model/base-types/Test');
const { prettyTestList } = require('./pretty-printing-tools/TestPrinter');
const QuestionCache = require('../controller/utils/QuestionCache');
const inquirer = require('inquirer').default;

function addTestCommands(program) {

    const controller = new TestController();
    program
        .command('mktest')
        .description("Create a new test")
        .argument('[questionsIds...]', 'The ids of the initial questions of the test', [])
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
        .action((id) => {
            const test = controller.readAll().find(t => t.id === parseInt(id));
            if (test) {
                controller.deleteTest(test);
                console.log(`Test with id ${id} deleted.`);
            } else {
                console.log(`Test with id ${id} not found.`);
            }
        })
    program
        .command('editest')
        .description("Edit a test")
        .argument('<id>', 'The id of the test to edit')
        .option('-r, --remove <questionId>', 'Remove a question from the test')
        .option('-a, --add <questionId>', 'Add a question to the test')
        .action((id, options) => {
            const test = controller.readAll().find(t => t.id === parseInt(id));
            if (!test) {
                console.log(`Test with id ${id} not found.`);
                return;
            }

            if (options.remove) {
                const question = QuestionCache.instance.getQuestion(parseInt(options.remove));
                if (question) {
                    controller.removeQuestionFromTest(test, question);
                    console.log(`Question with id ${options.remove} removed from test ${id}.`);
                } else {
                    console.log(`Question with id ${options.remove} not found.`);
                }
            }

            if (options.add) {
                const question = QuestionCache.instance.getQuestion(parseInt(options.add));
                if (question) {
                    controller.addQuestionToTest(test, question);
                    console.log(`Question with id ${options.add} added to test ${id}.`);
                } else {
                    console.log(`Question with id ${options.add} not found.`);
                }
            }
        })
    program
        .command('veriftest') // en attente de la creation vCard
        .description("Verify that a test is valid")
        .argument('<id>', 'The id of the test to verify')
        //.argument('<vCardFile>', 'The vCard file needed the verification')
        .action((id) => {
            const test = controller.readAll().find(t => t.id === parseInt(id));
            if (!test) {
                console.log(`Test with id ${id} not found.`);
                return;
            }
            if (test.isValid()) {
                console.log(`Test with id ${id} is valid.`);
            } else {
                console.log(`Test with id ${id} is not valid.`);
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
            //check la validité du test
            let score = 0;
            const correctQuestions = [];
            const incorrectQuestions = [];

            for (const question of test.questions) {
                const answer = await inquirer.prompt([{
                    type: 'input',
                    name: 'userAnswer',
                    message: question.question
                }]);

                if (answer.userAnswer === question.answer) {
                    score++;
                    correctQuestions.push(question.question);
                } else {
                    incorrectQuestions.push(question.question);
                }
            }

            console.log(`Your score: ${score}/${test.questions.length}`);
            console.log('Correct questions:');
            correctQuestions.forEach(q => console.log(q));
            console.log('Incorrect questions:');
            incorrectQuestions.forEach(q => console.log(q));

        })




}
module.exports = addTestCommands;