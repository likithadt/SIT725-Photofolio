const landingModel = require('../models/landing');

class LandingController {
    async getAllData(req, res) {
        try {
            const data = await landingModel.getLandingData();
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async insertData(req, res) {
        try {
            const data = await landingModel.insertDat(req.body);
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
}


module.exports = new LandingController();