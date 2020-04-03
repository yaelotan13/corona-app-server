function validation (req, res, next) {
  const [requestId, deviceId, validationStr] = req.body.decrypted;

  // if token is invalid send 200 anyway
  if (validationStr !== 'valid') return res.status(200).end();

  req.body._id = deviceId;
  delete req.body.decrypted;
  next();
}

module.exports = validation;