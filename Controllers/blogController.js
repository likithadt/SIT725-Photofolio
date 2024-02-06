const blogModel = require('../models/blog');

class blogController
{
    async getBlogs(req,res)
    {
        try {
            const data = await blogModel.getBlogs();
            res.json(data);
        } catch (error) {
            console.log("Error in getBlogs() at controller", error);
        }
    }
}

module.exports = new blogController();