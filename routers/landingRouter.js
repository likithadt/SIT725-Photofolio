let express = require('express');
let router = express.Router();

// define all controllers
const landingController = require('../Controllers/landingController');

// routing the controllers based on API
router.get('/get', landingController.getAllData);
router.post('/add', landingController.insertData);
router.put('/update/:id', landingController.updateData);
router.delete('/delete/:id', landingController.deleteData);

router.post('/query', landingController.postUserQuery);
router.get('/testimonials', landingController.getTestimonialsData);

module.exports = router;