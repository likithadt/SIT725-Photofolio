let client = require('../dbConnection');
let collection = client.db('photofolio').collection('users');

function getAllUsers(callback) {
    collection.find({}).toArray(callback);
}

function postUser(user, callback) {
    collection.insertOne(user,callback);
}

module.exports = {postUser,getAllUsers}