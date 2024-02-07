const clientsModel = require('../models/clients');
const mailService = require('./../services');

class clientsController {
    async fetchPhotographers(req, res) {
        try {
            const data = await clientsModel.fetchPhotographer();
            res.json(data);

        } catch(error) {
            console.log("Error fetching photographers :", error);
        }
    }

    async fetchSinglePhotographerImage(req, res) {
        try {
            const data = await clientsModel.fetchSinglePhotographerImage(req.body.id);
            res.json(data);

        } catch(error) {
            console.log("Error fetching photographer images :", error);
        }
    }

    async fetchSearchedPhotographer(req, res) {
        try {
            const data = await clientsModel.fetchSinglePhotographerData(req.body.searchText);
            res.json(data);

        } catch(error) {
            console.log("Error fetching searching photographer :", error);
        }
    }
}

module.exports = new clientsController();