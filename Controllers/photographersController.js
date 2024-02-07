const photographersModel = require('../models/photographers');
const mailService = require('./../services');

class PhotographersController {
    async newPortfolio(req,res) {
        try {
            const data = await photographersModel.newPortfolio(req.body);
            res.json(data);
        } catch (errro) {
            console.log("error isnside login controller");
        }
    }

    async portfolios(req, res) {
        try {
            const data = await photographersModel.portfolios();
            res.json(data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
    
    async bookingRequests(req, res) {
        try {
            const data = await photographersModel.bookingRequests();
            res.json(data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async sendAcceptMessage(req,res) {
        try {
            let body = req.body;
            mailService.sendEmail(body.email_data.email, body.email_data.subject, body.email_data.body);
            
            const data = await photographersModel.sendAcceptMessage(body.id, {status: body.status});
            res.json(data);
        } catch (errro) {
            console.log("error isnside login controller");
        }
    }

    async sendRejectMessage(req,res) {
        try {
            let body = req.body;
            mailService.sendEmail(body.email_data.email, body.email_data.subject, body.email_data.body);
            
            const data = await photographersModel.sendRejectMessage(body.id, {status: body.status});
            res.json(data);
        } catch (errro) {
            console.log("error isnside login controller");
        }
    }

}

module.exports = new PhotographersController();
