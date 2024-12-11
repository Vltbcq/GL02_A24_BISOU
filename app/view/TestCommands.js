const TestController = require('../controller/TestController');
const {prettyTestList} = require('./pretty-printing-tools/TestPrinter');
const QuestionCache = require('../controller/utils/QuestionCache');
const TestCache = require('../controller/utils/TestCache');
const inquirer = require('inquirer').default;
const Table = require('cli-table3');
const figlet = require('figlet');

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

            let score = 0;
            const results = [];

            for (const question of test.questions) {
                const answer = await inquirer.prompt([{
                    type: 'input',
                    name: 'userAnswer',
                    message: question.question
                }]);

                results.push({
                    question: question.question,
                    userAnswer: answer.userAnswer,
                    correctAnswer: question.answer,
                    isCorrect: answer.userAnswer === question.answer
                });

                if (answer.userAnswer === question.answer) {
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
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data);
            });
        });
        




}
module.exports = addTestCommands;