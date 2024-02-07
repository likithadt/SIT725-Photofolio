const mailService = require('./../services');
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

    async updateData(req, res) {
        try {
            const id = req.params.id;
            const data = await landingModel.updateDat(id, req.body);
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async deleteData(req, res) {
        try {
            const id = req.params.id;
            const data = await landingModel.deleteDat(id);
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async postUserQuery (req, res) {
        try {
            const data = await landingModel.insertQuery(req.body);
            res.json(data);

            console.log("Data at controller :",data);
            const emailContent = req.body;
                const enquiry_body = `
Dear ${emailContent.userName},
                
Thank you for reaching out to us! We have received your message and one of our team members will get back to you as soon as possible. We appreciate your interest in Photofolio.
                
Here are the details you provided:
                
Name: ${emailContent.userName}
Email: ${emailContent.userEmail}
Message: ${emailContent.userQuery}
                
Our team is dedicated to providing excellent customer service, and we will do our best to address your inquiry promptly.
                
Thank you for choosing Photofolio. We look forward to assisting you.
                
Best Regards,
                `;
        
                mailService.sendEmail(emailContent.userEmail, 'Thank You for Contacting Us', enquiry_body);
        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }

    async getTestimonialsData (req, res) {
        try {
            const data = await landingModel.getTestimonialsData();
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
}



module.exports = new LandingController();