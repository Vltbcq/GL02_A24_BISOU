const TestController = require('../controller/TestController');
const {prettyTestList} = require('./pretty-printing-tools/TestPrinter');
const QuestionCache = require('../controller/utils/QuestionCache');
const TestCache = require('../controller/utils/TestCache');
const inquirer = require('inquirer').default;
const logger = require("../security/Logger");

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
                    console.error(error);
                }
                
            })

        program
            .command('comparison')
            .description('Create a visualization of test comparisons')
            .argument('<id>','ID of the test you want to compare')
            .action((id) => {
                try{
                    tests = controller.readAll();
                    controller.compare(parseInt(id), tests);
                    logger.info("Visualization of test comparisons has been created")
                } catch(error){
                    console.error(error);
                }
                if (action === 'Add') {
                    controller.addQuestionToTest(test, question);
                    console.log(`Question with id ${questionId} added to test ${id}.`);
                } else if (action === 'Remove') {
                    controller.removeQuestionFromTest(test, question);
                    console.log(`Question with id ${questionId} removed from test ${id}.`);
                }
            });

        program
            .command('profile')
            .description('Create a visualization of test profile')
            .argument('<id>', 'ID of the test you want to get the test profile')
            .action((id) => {
                try{
                    let tests = controller.readAll()
                    controller.testProfile(id, tests);
                    logger.info("Visualization of test profile has been created")
                } catch(error){
                    console.error(error.message);
                }
                
            })

        program
            .command('comparison')
            .description('Create a visualization of test comparisons')
            .argument('<id>','ID of the test you want to compare')
            .action((id) => {
                try{
                    let tests = controller.readAll();
                    controller.compare(id, tests);
                    logger.info("Visualization of test comparisons has been created")
                } catch(error){
                    console.error(error.message);
                }
            })
}
module.exports = addTestCommands;
