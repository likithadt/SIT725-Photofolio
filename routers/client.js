let express = require('express');
let router = express.Router();

const clientsController = require('../Controllers/clientController');

router.get('/fetchPhotographers',clientsController.fetchPhotographers);
router.post('/fetchPhotographerImage', clientsController.fetchSinglePhotographerImage);
router.post('/searchPhotographer', clientsController.fetchSearchedPhotographer);


module.exports = router;