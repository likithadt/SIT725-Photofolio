let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collectionUsers = selDB.collection('users');
let collectionBooking = selDB.collection('bookings');
let collectionPortfolio = selDB.collection('portfolios');
let ObjectId = require('mongodb').ObjectId;

class clients {
    async fetchPhotographer() {
        try {
            const data = await collectionUsers.find({role: 'photographer'}).toArray();
            return data;
        }
        catch (error) {
            console.log("Error while fetching photographers list", error);
        }
    }

    async fetchSinglePhotographerImage(photographerId) {
        try {
            const data = await collectionPortfolio.find({photographerId: photographerId}).toArray();
            return data;
        }
        catch (error) {
            console.log("Error while fetching photographers images", error);
        }
    }

    async fetchSinglePhotographerData(searchText) {
        try {
            const data = await collectionUsers.find({name: searchText}).toArray();
            return data;
        }
        catch (error) {
            console.log("Error while searching photographer", error);
        }
    }
}

module.exports = new clients();