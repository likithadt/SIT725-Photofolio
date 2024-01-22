const express = require('express');
const app = express();
const db = require('./dbConnection');
const landingRouter = require('./routers/landingRouter');
const loginRouter = require('./routers/loginRouter');
var bodyParser = require('body-parser');

const path = require('path');
let PORT = process.env.port || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/userRegistration', function (req, res) {
  res.sendFile(path.join(__dirname,'authentication', 'userRegistration.html')); 
})

app.use('/landing', landingRouter);
app.use('/userRegistration', loginRouter);




app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log(`Server running on port ${PORT}`);
  } catch(error) {
    console.log('Error connecting to the Database: ', error);
  }
});