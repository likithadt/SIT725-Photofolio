let db = require('../dbConnection');
let gridfs = require('gridfs-stream');
const MongoClient = require('mongodb');
let selDB = db.client.db('photofolio');
let collection = selDB.collection('images');

// let gfs = gridfs(selDB, MongoClient.mongo);
let bucket = new MongoClient.GridFSBucket(selDB, { bucketName: 'imagesDump' });

class imagesModel {
    async uploadImages(file) {
        return new Promise((resolve, reject) => {
            const writeStream = gfs.createWriteStream({
              filename: file.originalname,
              mode: 'w',
              content_type: file.mimetype,
            });
      
            writeStream.write(file.buffer);
            writeStream.end();
      
            writeStream.on('close', (file) => {
              resolve(file._id.toString());
            });
      
            writeStream.on('error', (error) => {
              reject(error);
            });
        });
    }

}

module.exports = new imagesModel();