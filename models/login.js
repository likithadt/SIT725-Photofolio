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
    async getEmail(email, pass) {
        try {
            const userEmail = await collection.findOne({ email: email, password: pass});
            if (userEmail) {
                return {
                    email: userEmail.email,
                    name: userEmail.name,
                    role: userEmail.role,
                    id: userEmail._id.toString(),
                };
            }
            else {
                return null;
            }
        } catch (error) {
            console.log("Error inside getEmail() ", error);

        }
    }

    async fetchResetEmail(email) {
        try {
            const userEmail = await collection.findOne({ email: email});
            if (userEmail) {
                return {
                    email: userEmail.email,
                    name: userEmail.name,
                    role: userEmail.role,
                    id: userEmail._id.toString(),
                };
            }
            else {
                return null;
            }
        } catch (error) {
            console.log("Error inside getEmail() ", error);

        }
    }

    async resetPasswordToDB(body) {
        let email = body.email;
        const data = await collection.updateOne({email: email}, {$set: body});
        return data.modifiedCount > 0;
    }
}

module.exports = new login()
