let express = require('express');
let router = express.Router();

const loginController = require('../Controllers/loginController');
router.post('/adduser',loginController.addusers);
router.get('/getuser',loginController.getusers);

module.exports = router;
