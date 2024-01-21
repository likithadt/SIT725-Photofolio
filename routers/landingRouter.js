let express = require('express');
let router = express.Router();

// define all controllers
const landingController = require('../Controllers/landingController');

// routing the controllers based on API
router.get('/get', landingController.getAllData);
router.post('/add', landingController.insertData);

module.exports = router;