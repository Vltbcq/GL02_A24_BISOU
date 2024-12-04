const TestController = require('../controller/TestController');
const Test = require('../model/base-types/Test');
const {prettyTestList} = require('./pretty-printing-tools/TestPrinter');
const QuestionCache = require('../controller/utils/QuestionCache');

function addTestCommands(program) {

    const controller = new TestController();
    program
        .command('mktest')
        .description("Create a new test")
        .argument('<questions>', 'The initials questions of the test')
        .action((questionsIds) => {
            let test = controller.createTest();
            questions.forEach(questionsIds => {
                controller.addQuestionToTest(test, QuestionCache.getQuestionbyId(questionsIds));
            })
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
            controller.deleteTest(id);
        })
    program
        .command('editest')
        .description("Edit a test")
        .argument('<id>', 'The id of the test to edit')
        .action((id) => {
            console.log("Not implemented yet");
        })

}
module.exports = addTestCommands;