let express = require('express');
let router = express.Router();
let photographersController = require('../Controllers/photographersController');
let usersController = require('../Controllers/usersController');

router.post('/', function(req, res){
    photographersController.postPhotographer(req, res);
});

router.get('/', (req,res)=>{
    photographersController.getAllPhotographers(req,res);
});

// router.delete('/', (req,res)=>{
//     photographersController.getAllCats(req,res);
// });

router.post('/', function(req, res){
    usersController.postUser(req, res);
});

router.get('/', (req,res)=>{
    usersController.getAllUsers(req,res);
});

// router.delete('/', (req,res)=>{
//     usersController.getAllCats(req,res);
// });

module.exports = router;