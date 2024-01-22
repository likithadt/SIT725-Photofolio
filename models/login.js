let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('users');

class login {

    async getusers() {
        try {
            const data = await collection.find().toArray();
            return data;
        }
        catch (error) {
            onsole.log("There is an error in loginController getuser()", error);
        }

    }
    async addusers(body) {
        try {
            const data = await collection.insertOne(body);
            return data;
        }
        catch (error) {
            console.log("There is an error in loginController adduser()", error);
        }

    }
}

module.exports = new login()
