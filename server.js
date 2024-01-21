const express = require('express');
const app = express();
const db = require('./dbConnection');
const landingRouter = require('./routers/landingRouter');

let PORT = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req,res) {
    res.render('index.html');
});

app.use('/landing', landingRouter);

app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log(`Server running on port ${PORT}`);
  } catch(error) {
    console.log('Error connecting to the Database: ', error);
  }
});