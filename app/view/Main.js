const { program } = require('commander');
const addQuestionCommands = require('./QuestionCommands');

program
    .name("SRU Tests Manager by Bisou")
    .description("A brand new software for managing tests and questions at Sealand's Republic University")


addQuestionCommands(program);

program.parse();

module.exports = program;