let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('users');

class landingModel {
    async getLandingData() {
        const data = await collection.find().toArray();
        return data;
    }

    async insertDat(body) {
        const data = await collection.insertOne(body);
        return data;
    }
}

module.exports = new landingModel();