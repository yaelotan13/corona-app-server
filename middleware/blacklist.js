const patientsService = require('../services/patients');

async function isBlackListed(req, res, next) {
  try {
    const patient = req.body;
    console.log(`in isBlackListed, req.body is:`)
    console.log(req.body);
    console.log('checking if the user device exsits');

    if (await patientsService.isBlackListed(patient)) {
      console.log('is black listed.')
      return res.status(401).end();
    }

    console.log('is NOT black listed.')
    next();
  } catch (e) {
    next(e); // send to error handler 500 middleware
  }
}

module.exports = isBlackListed;
