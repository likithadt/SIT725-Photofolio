let db = require('../dbConnection');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('blogs');

class newBlog
{
    async getBlogs()
    {
        try {
            const data = await collection.find().toArray();
            return data;
        } catch (error) {
            console.log("Error in getBlogs() at blog Model", Error);
        }
    }

    async postBlogs(body) {
        try {
            const data = await collection.insertOne(body);
            return data;
        }
        catch (error) {
            console.log("There is an error in postBlogs() at model", error);
        }

    }
}

module.exports = new newBlog();