const { program } = require('commander');
const addQuestionCommands = require('./QuestionCommands');
const addTestCommands = require('./TestCommands');

program
    .name("SRU Tests Manager by Bisou")
    .description("A brand new software for managing tests and questions at Sealand's Republic University")

addQuestionCommands(program);
addTestCommands(program);

program.parse(process.argv);

module.exports = program;