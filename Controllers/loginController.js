const e = require('express');
const loginModel = require('../models/login');
const mailService = require('./../services');

class loginController {
    async addusers(req, res) {
        try {
            const data = await loginModel.addusers(req.body);
            res.json(data);
            console.log("Data at controller :", data);
        } catch (error) {
            console.log("error isnside login controller");

        }
    }

    async getusers(req, res) {
        try {

            const data = await loginModel.getusers();
            res.json(data);

            console.log("Data at controller :", data);

        } catch (error) {
            console.log("Error fetching users :", error);
        }
    }


    async logUser(req, res) {
        try {
            const email = req.body.email;
            const pass = req.body.password;
            const userData = await loginModel.getEmail(email, pass);
            //console.log(userEmail);
            if (userData) {

                res.json({ success: true, message: "Login Successful", userData });
            }
            else {
                res.json({ success: false, message: "Check Email Id or Password"});
            }

        } catch (error) {
            console.log("Error at logUser() at login Controller", error);

        }
    }

    async sendResetPasswordLink(req, res) {
        try {
            const email = req.body.email;
            const userEmail = await loginModel.getEmail(email);
            console.log(userEmail, "User email is ");
            if (userEmail) {
                const passwordLink = 'http://localhost:3000/authentication/newPassword.html';

                const emailBody = `
                Dear ${userEmail.email}, 
                Welcome to phtofolio , We have received a request to reset your password 
                Plese click on the following link inorder for you reset your password ${passwordLink}

                Thank you for using Photofolio !!!
                `;

                mailService.sendEmail(userEmail.email, "Request to reset password", emailBody);
                res.json({ success: true, message: "Email sent successfully" });
            }
            else {

                res.status(404).json({ success: false, message: "User Not Found" });
            }
        } catch (error) {
            console.log("Error in sendResetPasswordLink() at controller", error);
        }
    }

    async resetPassword(req, res) {
        try {
            const data = await loginModel.resetPasswordToDB(req.body);
            res.json(data);
        } catch(error) {
            console.log("Error in resetting password: ", error);
        }
    }
}

module.exports = new loginController();
