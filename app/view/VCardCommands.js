const VCardController = require("../controller/VCardController");
const logger = require("../security/Logger");

function addVCardCommands(program) {

    const controller = new VCardController();

    program
        .command('mkvcard')
        .description("Create a new vcard")
        .argument('<firstname>', 'First name')
        .argument('<lastname>', 'Last name')
        .argument('<mail>', 'E-Mail')
        .argument('<phone>','Phone number')
        .action((firstname, lastname, mail, phone) => {
            logger.info(`Execution of mkvcard command with the following parameters : [first name : ${firstname}; last name : ${lastname}, mail : ${mail}, phone : ${phone}`);
            controller.createVCard(firstname, lastname, mail, phone);
        })

    program
        .command('editvcard')
        .description("Edit a vCard that already exists. Please use 'npm run launch -- <id> [--<option-name> <option-value>]' if you want to edit a vCard.")
        .argument('<id>','ID of the vCard you want to edit')
        .option('--firstname <firstname>','Option to edit the first name of a vCard')
        .option('--lastname <lastname>','Option to edit the last name of a vCard')
        .option('--phone <phone>','Option to edit the phone of a vCard')
        .option('--mail <mail>','Option to edit the mail of a vCard')
        .action(function (id, options) {
            try{
                let tab = controller.tabvCard(id);
                if (options.firstname){
                    controller.editFirstName(tab, options.firstname);
                    logger.info(`You're updating the first name to ${options.firstname} on the vCard`)
                }
                if (options.lastname){
                    controller.editLastName(tab, options.lastname);
                    logger.info(`You're updating the first name to ${options.lastname} on the vCard`)
                }
                if (options.phone){
                    controller.editPhone(tab, options.phone);
                    logger.info(`You're updating the first name to ${options.phone} on the vCard`)
                }
                if (options.mail){
                    controller.editMail(tab, options.mail);
                    logger.info(`You're updating the first name to ${options.mail} on the vCard`)
                }
                controller.editvCard(id, tab);    
            } catch(error){
                console.error(error.message);
            }
        });


    program
        .command('rmvcard')
        .description('Delete a vCard that already exists')
        .argument('<id>','ID of the vCard you want to delete')
        .action((id) => {
            try{
                controller.deleteVCard(id);
                logger.info(`${id}.vcf has been deleted`);
            } catch(error){
                console.error(error.message);
            }
        })
}

module.exports = addVCardCommands;