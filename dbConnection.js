const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";

class Database {
    constructor() {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        this.dbName = 'photofolio';
    }

    async connect() {
        await this.client.connect();

        this.db = this.client.db('admin');
        let list = await this.db.admin().listDatabases();
        const databaseExists = list.databases.some(db => db.name == this.dbName);

        if (!databaseExists) {
            // Create a new database
            await this.client.db(this.dbName);
            console.log(`Database "${this.dbName}" created successfully`);
        
            //create collections
            this.selDb = this.client.db(this.dbName);
            await this.selDb.createCollection('users');
            await this.selDb.createCollection('portfolios');
            await this.selDb.createCollection('images');
            await this.selDb.createCollection('events');
            await this.selDb.createCollection('blogs');
            await this.selDb.createCollection('queries');
            await this.selDb.createCollection('testimonials');
            console.log(`Collections created successfully`);

        } else {
            this.selDb = await this.client.db(this.dbName);
            console.log(`Database "${this.dbName}" exists`);
        }
    }
    
    async close() {
        await this.client.close();
    }
}

module.exports = new Database();