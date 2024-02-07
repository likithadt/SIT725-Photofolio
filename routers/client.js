let express = require('express');
let router = express.Router();

const clientsController = require('../Controllers/clientController');

router.get('/fetchPhotographers',clientsController.fetchPhotographers);
router.post('/fetchPhotographerImage', clientsController.fetchSinglePhotographerImage);
router.post('/searchPhotographer', clientsController.fetchSearchedPhotographer);
router.post('/getSelectedPhotographer', clientsController.getSinglePhotographerData);
router.post('/getSelectedPortfolios', clientsController.getSelectedPortfolios);
router.post('/sendBookingNotification', clientsController.sendBookingNotification);
router.post('/getBookingRequests', clientsController.getBookingRequests);

module.exports = router;