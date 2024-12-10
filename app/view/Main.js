const { program } = require('commander');
const addQuestionCommands = require('./QuestionCommands');
const addVCardCommands = require('./VCardCommands')

program
    .name("SRU Tests Manager by Bisou")
    .description("A brand new software for managing tests and questions at Sealand's Republic University")

addQuestionCommands(program);
addVCardCommands(program);

program.parse(process.argv);

module.exports = program;