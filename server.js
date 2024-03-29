const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const db = require('./dbConnection');

// socket imports
const http = require("http").Server(app);
const socketIO = require("socket.io")(http);

//importing routers
const landingRouter = require('./routers/landingRouter');
const loginRouter = require('./routers/loginRouter');
const photographersRouter = require('./routers/photographers');
const clientPhotographer = require('./routers/client');
 
let PORT = process.env.port || 3000;
var bodyParser = require('body-parser');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/photofolio');
const Image = mongoose.model('Image', {
  data: Buffer,
  contentType: String,
});
 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
 
// Express route to handle file uploads
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
 
    const savedImage = await newImage.save();
 
    return res.status(200).json({
      message: 'File uploaded successfully',
      fileId: savedImage._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Express route to serve a file by its ID
app.get('/file/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const image = await Image.findById(fileId);
 
    if (!image) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


//socket connection
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user connected now`);
  socket.on('disconnect', () => {
    console.log('User Disconnected!');
  });

  //socket msgs
  socket.on('send_notification_to_photographer', (data) => {
    socket.broadcast.emit('booking_notification_sent_to_photographer', data);
  });

  socket.on('send_notification_to_client', (data) => {
    socket.broadcast.emit('booking_notification_sent_to_client', data);
  })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/userRegistration', function (req, res) {
  res.sendFile(path.join(__dirname,'authentication', 'userRegistration.html')); 
})
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'authentication', 'login.html')); 
})
app.get('/resetPassword', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'authentication', 'passwordReset.html')); 
})
app.get('/newPassword', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'authentication', 'newPassword.html')); 
})
// Defining routers with path
app.use('/landing', landingRouter);
app.use('/userRegistration', loginRouter);
app.use('/photographers', photographersRouter);
app.use('/login',loginRouter);
app.use('/resetPassword',loginRouter);
app.use('/newPassword',loginRouter);
app.use('/clients',clientPhotographer);

// app.listen(PORT, async () => {
//   try {
//     await db.connect();
//     console.log(`Server running on port ${PORT}`);
//   } catch(error) {
//     console.log('Error connecting to the Database: ', error);
//   }
// });

http.listen(PORT, async ()=> {
  try {
    await db.connect();
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket listening on ${PORT}`);
  } catch(error) {
    console.log('Error connecting to the Database: ', error);
  }
});