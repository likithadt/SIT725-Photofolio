let selDb = require('../dbConnection');
let collection = selDb.collection('clients');

function getAllUsers(callback) {
    collection.find({}).toArray(callback);
}

function postUser(user, callback) {
    collection.insertOne(user,callback);
}

module.exports = {postUser,getAllUsers}