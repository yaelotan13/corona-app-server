const { savePatient, getPatientByDistance } = require('../services');

async function getPatients (req, res, next) {
  const { radius, location } = req.body;
  try {
    const patient = await getPatientByDistance(radius, location);
    res.send(patient);
  } catch (e) {
    next(e); // caught by error handler status 500 middleware
    //TODO add error handling for different status codes
  }
}

async function addPatient (req, res, next) {
  try {
    const patient = {...req.body};
    await savePatient(patient);
    res.send(patient);
  } catch (e) {
    next(e); // caught by error handler status 500 middleware
    //TODO add error handling for different status codes
  }
}

module.exports = {
  addPatient,
  getPatients,
};