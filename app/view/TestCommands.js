const TestController = require('../controller/TestController');
const Test = require('../model/base-types/Test');
const {prettyTestList} = require('./pretty-printing-tools/TestPrinter');
const QuestionCache = require('../controller/utils/QuestionCache');
const TestCache = require('../controller/utils/TestCache');
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
        .action((id) => {
            const test = TestCache.instance.getTestById(parseInt(id));
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
        .command('veriftest') // en attente de la creation vCard
        .description("Verify that a test is valid")
        .argument('<id>', 'The id of the test to verify')
        //.argument('<vCardFile>', 'The vCard file needed the verification')
        .action((id) => {
            const test = TestCache.instance.getTestById(parseInt(id));
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
        
}
module.exports = addTestCommands;