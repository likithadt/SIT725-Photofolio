let express = require('express');
let router = express.Router();

const loginController = require('../Controllers/loginController');
router.post('/adduser',loginController.addusers);
router.get('/getuser',loginController.getusers);
router.post('/login',loginController.logUser);
module.exports = router;
