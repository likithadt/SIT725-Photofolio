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
    }
}
createDB();


module.exports = {client, selDb};