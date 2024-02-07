let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('portfolios');
let collectionBooking = selDB.collection('bookings');
let ObjectId = require('mongodb').ObjectId;

class photographers {

    async portfolios(photographerId) {
        try {
            const data = await collection.find({photographerId: photographerId}).toArray();
            return data;
        }
        catch (error) {
            console.log("There is an error in portfoios get all", error);
        }

    }
    async newPortfolio(body) {
        try {
            const data = await collection.insertOne(body);
            return data;
        }
        catch (error) {
            console.log("There is an error in loginController adduser()", error);
        }

    }

    async bookingRequests(photographerId) {
        try {
            const data = await collectionBooking.find({photographerId: photographerId}).toArray();
            return data;
        }
        catch (error) {
            console.log("There is an error in portfoios get all", error);
        }

    }

    async sendAcceptMessage(id, body) {
        const data = await collectionBooking.updateOne({_id: new ObjectId(id)}, {$set: body});
        return data.modifiedCount > 0;
    }

    async sendRejectMessage(id, body) {
        const data = await collectionBooking.updateOne({_id: new ObjectId(id)}, {$set: body});
        return data.modifiedCount > 0;
    }

    async deletePost(id) {
        // id = parseInt(id);
        const data = await collection.deleteOne({_id: new ObjectId(id)});
        return data.deletedCount > 0;
    }
}

module.exports = new photographers()
