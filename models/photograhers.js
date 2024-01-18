let client = require('../dbConnection');
let collection = client.db('photofolio').collection('Photographers');

function getAllPhotographers(callback) {
    collection.find({}).toArray(callback);
}

function postPhotographer(photographer, callback) {
    collection.insertOne(photographer,callback);
}

module.exports = {postPhotographer,getAllPhotographers}