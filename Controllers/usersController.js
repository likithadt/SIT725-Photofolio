let collection = require('../models/photographers');

const postUser = (req,res) => {
    let cat = req.body;
    collection.postUser(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllUsers = (req,res) => {
    collection.getAllUsers((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

// const deleteCat = (req,res) => {
//     let cat = req.body;
//     collection.deleteOne(cat, (err,result) => {
//         if (!err) {
//             res.json({statusCode:201,data:result,message:'success'});
//         }
//     });
// }

module.exports = {postUser, getAllUsers}