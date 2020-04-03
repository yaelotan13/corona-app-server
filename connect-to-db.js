const mongoose = require('mongoose');
const { DB_URL } = require('./config');

function connectDB () {
  mongoose.connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
// mongoose.connection
//   .once('open', () => console.log('connected'))
//   .on('error', (error) => console.log(error));
}

module.exports = connectDB;