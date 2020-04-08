const { savePatient, getPatientByDistance } = require('../services');

async function getPatients (req, res, next) {
  const { radius, latitude, longitude } = req.query;
  const location = { latitude, longitude};
  try {
    const patients = await getPatientByDistance(radius, location);
    console.log('GOT THE RESPONSE, SENDING: ')
    console.log(patients);
    res.send(patients);
  } catch (e) {
    next(e); // caught by error handler status 500 middleware
    //TODO add error handling for different status codes
  }
}

async function addPatient (req, res, next) {
  console.log('add patient');
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