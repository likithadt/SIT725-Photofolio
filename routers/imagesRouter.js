let express = require('express');
let multer = require('multer');

let router = express.Router();
let upload = multer();

// define all controllers
const imagesController = require('../Controllers/imagesController');

// routing the controllers based on API
router.post('/upload', upload.single('image'), imagesController.uploadImage);
router.get('/list/:id', imagesController.fetchImage);

module.exports = router;