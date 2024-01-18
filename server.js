const express = require('express');
const app = express();
require('./dbConnection');
let PORT = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req,res) {
    res.render('index.html');
}); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});