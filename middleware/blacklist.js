const patientsService = require('../services/patients-service');

async function isBlackListed(req, res, next) {
  try {
    const patient = req.body;

    // if black listed send 200 anyway
    if (await patientsService.isBlackListed(patient)) {
      console.log('is black listed.')
      return res.status(200).end();
    }

    next();
  } catch (e) {
    next(e); // send to error handler 500 middleware
  }
}

module.exports = isBlackListed;
