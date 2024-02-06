let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('blogs');

class blogs {
    async getBlogs() {
        try {
            const data = await collection.find().toArray();
            return data;
        } catch (error) {
            console.log("Error in getblogs() model ", error);

        }
    }
}

module.exports = new blogs();