const vCardsJS = require('vcards-js'); //npm install vcards-js --save
const fs = require('fs');
const path = require('path');
const vcard_path = path.resolve('data/vcards');

class VCardController{
    /**
     * Crée une nouvelle vCard
     * @param {string} firstname - Prénom
     * @param {string} lastname - Nom
     * @param {string} mail - Adresse mail
     * @param {string} phone - Numéro de téléphone
     */
    createVCard(firstname, lastname, mail, phone){
        let id = this.readLastID() + 1;
        let vCard = vCardsJS();

        vCard.firstName = firstname;
        vCard.lastName = lastname;
        vCard.email = mail;
        vCard.workPhone = phone;

        vCard.saveToFile(`${vcard_path}/${id}.vcf`);
    }

    /**
     * Crée un tableau avec toutes les informations d'une vCard déjà existante (Prénom, Nom, Téléphone, Mail)
     * @param {number} id - ID de la vCard
     * @returns {[]string} - Tableau contenant les informations de la vCard
     */
    tabvCard(id){
        let vCardContent = fs.readFileSync(`${vcard_path}/${id}.vcf`, 'utf-8');
        let name = vCardContent.match(/FN;CHARSET=UTF-8:(.*)/)[1].trim();
        let phone = vCardContent.match(/TEL;TYPE=WORK,VOICE:(.*)/)[1].trim();
        let mail = vCardContent.match(/EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:(.*)/)[1].trim();
        let full_name = name.split(" ");
        let firstname = full_name[0];
        let lastname = full_name[1];
        return [firstname, lastname, phone, mail]
    }

    /**
     * Modifie une vCard déjà existante
     * @param {number} id - ID de la vCard qu'on souhaite modifier
     * @param {[]string} tab - Tableau contenant les informations de la vCard
     */
    editvCard(id, tab){
        let vCard = vCardsJS();

        vCard.firstName = tab[0];
        vCard.lastName = tab[1];
        vCard.email = tab[2];
        vCard.workPhone = tab[3];

        vCard.saveToFile(`${vcard_path}/${id}.vcf`);
    }

    /**
     * Modifie le prénom d'un tableau pour vCard
     * @param {[]string} tab - Tableau contenant les informations de la vCard
     * @param {string} newFirstName - Nouveau Prénom
     */
    editFirstName(tab, newFirstName){
        tab[0] = newFirstName;
    }

    /**
     * Modifie le nom d'un tableau pour vCard
     * @param {[]string} tab - Tableau contenant les informations de la vCard
     * @param {string} newLastName - Nouveau Nom
     */
    editLastName(tab, newLastName){
        tab[1] = newLastName;
    }

    /**
     * Modifie le numéro de téléphone d'un tableau pour vCard
     * @param {[]string} tab - Tableau contenant les informations de la vCard
     * @param {string} newPhone - Nouveau numéro de téléphone
     */
    editPhone(tab, newPhone){
        tab[2] = newPhone;
    }

    /**
     * Modifie le mail d'un tableau pour vCard
     * @param {[]string} tab - Tableau contenant les informations de la vCard
     * @param {string} newMail - Nouveau mail
     */
    editMail(tab, newMail){
        tab[3] = newMail;
    }


    /**
     * Supprime une vCard à partir de son ID
     * @param {number} id - ID de la vCard 
     */
    deleteVCard(id){
        fs.unlinkSync(`${vcard_path}/${id}.vcf`);
    }

    /**
     * Lecture du dernier ID créé
     * @returns {number} - renvoie l'ID le plus grand parmis les vCards
     */
    readLastID(){
        let tab = [];
        const files = fs.readdirSync(vcard_path);
        files.forEach((file) => {
            tab.push(path.basename(file, path.extname(file)));
        });
        if (tab.length > 0){
            return Math.max(...tab);
        } else {
            return -1
        }
    }
}

module.exports = VCardController;