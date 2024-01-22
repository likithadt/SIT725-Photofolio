const imagesModel = require('../models/images');

class imagesController {
    async uploadImage(req, res) {
        try {
            const data = await imagesModel.uploadImages(req.file);
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
}

module.exports = new imagesController();