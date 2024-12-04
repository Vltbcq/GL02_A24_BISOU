const TestController = require('../controller/TestController');
const Test = require('../model/base-types/Test');
const {prettyTestList} = require('./pretty-printing-tools/TestPrinter');

function addTestCommands(program) {

    const controller = new TestController();
    program
        .command('mktest')
        .description("Create a new test")
        .argument('<name>', 'The name of the test')
        .action((name) => {
            controller.createTest(name)
        })
    program
        .command('showtests')
        .description("Show the tests available")
        .action(() => {
            let tests = controller.readAll();
            console.log(prettyTestList(tests));
        })

}