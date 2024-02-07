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
            const data = await photographersModel.portfolios(req.body.photographerId);
            res.json(data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
    
    async bookingRequests(req, res) {
        try {
            const data = await photographersModel.bookingRequests(req.body.photographerId);
            res.json(data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async createNewBlog(req, res) {
        try {
            const data = await photographersModel.createNewBlog(req.body);
            res.json(data);

        } catch(error) {
            console.log("Error creating a new blog :", error);
        }
    }

    async fetchAllBlogs(req, res) {
        try {
            const data = await photographersModel.showAllBlogs(req.body.photographerId);
            res.json(data);

        } catch(error) {
            console.log("Error fetching blogs :", error);
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

    async deletePost(req, res) {
        try {
            const id = req.params.id;
            const data = await photographersModel.deletePost(id);
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async events(req, res) {
        try {
            const data = await photographersModel.events();
            res.json(data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async deleteBlog(req, res) {
        try {
            const id = req.params.id;
            const data = await photographersModel.deleteBlog(id);
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
}

module.exports = new PhotographersController();
