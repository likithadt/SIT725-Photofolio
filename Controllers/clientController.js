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

    async getSinglePhotographerData(req, res) {
        try {
            const data = await clientsModel.getSinglePhotographer(req.body.pId);
            res.json(data);

        } catch(error) {
            console.log("Error fetching photographer data :", error);
        }
    }

    async getSelectedPortfolios(req, res) {
        try {
            const data = await clientsModel.getPhotographerPortfolio(req.body.id);
            res.json(data);

        } catch(error) {
            console.log("Error fetching photographer data :", error);
        }
    }

    async sendBookingNotification(req, res) {
        try {
            const data = await clientsModel.sendBookingNotification(req.body);
            res.json(data);

        } catch(error) {
            console.log("Error fetching photographer data :", error);
        }
    }

    async getBookingRequests(req, res) {
        try {
            const data = await clientsModel.getBookingRequests(req.body.clientId);
            res.json(data);

        } catch(error) {
            console.log("Error fetching Bookings :", error);
        }
    }

    async fetchAllBlogs(req, res) {
        try {
            const data = await clientsModel.fetchAllBlogs();
            res.json(data);

        } catch(error) {
            console.log("Error fetching Bookings :", error);
        }
    }
}

module.exports = new clientsController();