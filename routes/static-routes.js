const path = require('path');

module.exports = app => {
  app.get('/', (req, res) => {
    console.log(req.originalUrl);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
};