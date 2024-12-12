const fs = require('fs');
const path = require('path');
const vcard_path = path.resolve('data/vcards');

class VCardController{
    isCorrectId(id) {
        const files = fs.readdirSync(vcard_path);
        const idName = id.toString();
        return files.some((file) => {
            let fileName = path.basename(file, path.extname(file));
            return fileName === idName;
        });
    }

    addVCardToTest(vcard_id, test){
        if (this.isCorrectId(id)){
            test._vCard = vcard_id;
        } else{
            throw new Error("Wrong vCard ID")
        }
    }
}

module.exports = VCardController;