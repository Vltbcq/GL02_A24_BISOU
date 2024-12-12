#!/usr/bin/env node

const { program } = require('commander');
const addQuestionCommands = require('./QuestionCommands');
const addVCardCommands = require('./VCardCommands')
const addTestCommands = require('./TestCommands');
const fs = require('fs');

program
    .name("SRU Tests Manager by Bisou")
    .description("A brand new software for managing tests and questions at Sealand's Republic University")

program
    .command('readme')
    .description('Display the readme file')
    .action(() => {
        fs.readFile("README.md", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
    });

addQuestionCommands(program);
addVCardCommands(program);
addTestCommands(program);

//command to display readme file


program.parse(process.argv);

module.exports = program;