const loginModel = require('../models/login');


class loginController {
    async addusers(req,res) {
        try {
            const data = await loginModel.addusers(req.body);
            res.json(data);
            console.log("Data at controller :",data);
        } catch (errro) {
            console.log("error isnside login controller");

        }
    }

    async getusers(req, res) {
        try {
            const data = await loginModel.getusers();
            res.json(data);

            console.log("Data at controller :",data);

        } catch(error) {
            console.log("Error fetching users :", error);
        }
    }
}

module.exports = new loginController();
