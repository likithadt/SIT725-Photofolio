const blogModel = require('../models/newBlog');

class blogController {
    async getBlogs(req, res) {
        try {
            const data = await blogModel.getBlogs();
            res.json(data);

            console.log("Data at controller :", data);
        } catch (error) {
            console.log("Error at get Blogs() at controller", error);
        }
    }

    async postBlogs(req, res) {
        try {
            const data = await blogModel.postBlogs(req.body);
            res.json(data);
            console.log("Data at the post blogs ", data);
        } catch (error) {
            console.log("Error at postBlogs() at controller", error); 1
        }
    }
}
module.exports = new blogController();