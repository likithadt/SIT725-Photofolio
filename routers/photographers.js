let express = require('express');
let router = express.Router();

const photographersController = require('../Controllers/photographersController');
router.post('/newportfolio', photographersController.newPortfolio);
router.post('/portfolios',photographersController.portfolios);
router.post('/bookingRequests',photographersController.bookingRequests);
router.put('/sendAcceptMessage', photographersController.sendAcceptMessage)
router.put('/sendRejectMessage', photographersController.sendRejectMessage)
router.delete('/delete/:id', photographersController.deletePost);


module.exports = router;