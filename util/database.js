const mongodb = require('mongodb');
const { DB_URL } = require('../config');

const mongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
  mongoClient.connect(DB_URL, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
  })
  .catch(error => {
    console.log(error);
    throw(error);
  })
}

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No DB found';
}

module.exports = {
  mongoConnect,
  getDb
}
