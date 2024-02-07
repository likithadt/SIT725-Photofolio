let express = require('express');
let router = express.Router();

const blogController = require('../Controllers/blogController');

router.get('/getblogs',blogController.getBlogs);
router.post('/blog',blogController.postBlogs);

module.exports = router