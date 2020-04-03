function requireHttps(req, res, next) {
  console.log('https://' + req.headers.host + req.url);
  //TODO host name is hard
  res.redirect(301, 'https://' + 'localhost:5000' + req.url);
}

module.exports = {
  requireHttps
};