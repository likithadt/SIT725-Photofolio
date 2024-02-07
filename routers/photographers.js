let express = require('express');
let router = express.Router();

const photographersController = require('../Controllers/photographersController');
router.post('/newportfolio', photographersController.newPortfolio);
router.get('/portfolios',photographersController.portfolios);
router.get('/bookingRequests',photographersController.bookingRequests);
router.put('/sendAcceptMessage', photographersController.sendAcceptMessage)
router.put('/sendRejectMessage', photographersController.sendRejectMessage)


module.exports = router;