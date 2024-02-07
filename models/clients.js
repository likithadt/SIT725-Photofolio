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

    async getSinglePhotographer(pid) {
        try {
            const data = await collectionUsers.find({_id: new ObjectId(pid)}).toArray();
            return data;
        }
        catch (error) {
            console.log("Error while searching photographer", error);
        }
    }

    async getPhotographerPortfolio(id) {
        try {
            const data = await collectionPortfolio.find({photographerId: id}).toArray();
            return data;
        }
        catch (error) {
            console.log("Error while searching photographer", error);
        }
    }

    async sendBookingNotification(body) {
        try {
            const data = await collectionBooking.insertOne(body);
            return data;
        }
        catch (error) {
            console.log("Error while adding the booking", error);
        }   
    }

    async getBookingRequests(id) {
        try {
            const data = await collectionBooking.find({clientId: id}).toArray();
            return data;
        }
        catch (error) {
            console.log("Error while fetching bookings", error);
        }
    }
}

module.exports = new clients();