const VCardController = require("../controller/VCardController");
const TestCache = require("../controller/utils/TestCache")
const logger = require("../security/Logger");

function addVCardCommands(program) {

    const controller = new VCardController();

    program
        .command('linkvcard')
        .description("Link a vcard to a test")
        .argument('<vcard_id>', 'vCard ID')
        .argument('<test_id>', 'Test ID')
        .action((vcard_id, test_id) => {
            try{
                logger.info(`Execution of linkvcard.`);
                let test = TestCache._instance.getTestById(test_id);
                controller.addVCardToTest(vcard_id, test);
                console.log(`${vcard_id}.vcf get linked to test ${test_id}.`);
            } catch(error){
                console.error(error.message);
            }
        })
}

module.exports = addVCardCommands;