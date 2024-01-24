let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('bookings');