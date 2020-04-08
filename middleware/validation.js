function validation (req, res, next) {
  const [requestId, deviceId, validationStr] = req.body.decrypted;

  if (validationStr !== 'valid') return res.status(200).end();

  req.body._id = deviceId;
  console.log(`in validation, req.body._id is ${req.body._id}`);
  delete req.body.decrypted;
  next();
}

module.exports = validation;