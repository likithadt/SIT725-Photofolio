let collection = require('../models/photographers');

const postPhotographer = (req,res) => {
    let cat = req.body;
    collection.postPhotographer(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllPhotographers = (req,res) => {
    collection.getAllPhotographers((error,result)=>{
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

module.exports = {postPhotographer, getAllPhotographers}