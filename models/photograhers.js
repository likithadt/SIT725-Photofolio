let selDb = require('../dbConnection');
let collection = selDb.collection('Photographers');

function getAllPhotographers(callback) {
    collection.find({}).toArray(callback);
}

function postPhotographer(photographer, callback) {
    collection.insertOne(photographer,callback);
}

module.exports = {postPhotographer,getAllPhotographers}