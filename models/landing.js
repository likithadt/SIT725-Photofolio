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

    async updateDat(id, body) {
        id = parseInt(id);
        const data = await collection.updateOne({id: id}, {$set: body});
        return data.modifiedCount > 0;
    }

    async deleteDat(id) {
        id = parseInt(id);
        const data = await collection.deleteOne({id: id});
        return data.deletedCount > 0;
    }
}

module.exports = new landingModel();