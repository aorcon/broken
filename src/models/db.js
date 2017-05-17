const MongoClient = require('mongodb').MongoClient;
const config = require('config');
let db;

class Db {
    async connect() {
        if (!db) {
            db = await MongoClient.connect(config.db.url, config.db.options);
        }
    }
    db() {
        return db;
    }
};

module.exports = new Db();
