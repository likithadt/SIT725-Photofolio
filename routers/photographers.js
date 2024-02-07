let express = require('express');
let router = express.Router();

const photographersController = require('../Controllers/photographersController');
router.post('/newportfolio', photographersController.newPortfolio);
router.post('/portfolios',photographersController.portfolios);
router.post('/bookingRequests',photographersController.bookingRequests);
router.put('/sendAcceptMessage', photographersController.sendAcceptMessage)
router.put('/sendRejectMessage', photographersController.sendRejectMessage)
router.delete('/delete/:id', photographersController.deletePost);
router.get('/events',photographersController.events);
router.post('/createNewBlog',photographersController.createNewBlog);
router.post('/fetchAllBlogs',photographersController.fetchAllBlogs);
router.delete('/deleteBlog/:id', photographersController.deleteBlog);


module.exports = router;