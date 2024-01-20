const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

dbName = 'photofolio';
var selDb;

async function createDB() {
    await client.connect();
    db = client.db('admin');
    list = await db.admin().listDatabases();
    const databaseExists = list.databases.some(db => db.name == dbName);

    if (!databaseExists) {
        // Create a new database
        await client.db(dbName);
        console.log(`Database "${dbName}" created successfully`);
        
        //create collections
        selDb = client.db(dbName);
        await selDb.createCollection('users');
        await selDb.createCollection('portfolios');
        await selDb.createCollection('images');
        await selDb.createCollection('events');
        await selDb.createCollection('blogs');
        console.log(`Collections created successfully`);

      } else {
        console.log(`Database "${dbName}" exists`);
        selDb = client.db(dbName);
    }
}

function uploadImage() {
 console.log("Hello upload");
}

const nodemailer = require('nodemailer');

function sendEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: 'team.photofolio@gmail.com', // Your email address
          pass: 'lhiiwnzzurnjwqxl' // Your email password or app-specific password
        }
    });

    const mailOptions = {
        from: 'team.photofolio@gmail.com', // Sender email address
        to: 'likhithadt2011@gmail.com', // Recipient email address
        subject: 'Hello from Photofolio Team',
        text: 'This is the Body of the email, regards..'
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}

createDB();
uploadImage();
// sendEmail();

module.exports = {client, selDb};