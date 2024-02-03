const e = require('express');
const loginModel = require('../models/login');


class loginController {
    async addusers(req, res) {
        try {
            const data = await loginModel.addusers(req.body);
            res.json(data);
            console.log("Data at controller :", data);
        } catch (errro) {
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
            const userEmail = await loginModel.getEmail(email);
            //console.log(userEmail);
            if (userEmail) {

                res.json({ success: true, message: "Login Successful", email: userEmail.email, role: userEmail.role });
            }
            else {
                res.json({ sucess: false, message: "Check Email Id or Password " });
            }

        } catch (error) {
            console.log("Erreo at logUser() at login Controller", error);

        }
    }
}

module.exports = new loginController();
