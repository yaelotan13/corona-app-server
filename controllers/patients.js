const { savePatient, getPatientByDistance } = require('../services');

async function getPatients (req, res, next) {
  const { radius, latitude, longitude } = req.query;
  const location = { latitude, longitude};
  try {
    const patients = await getPatientByDistance(radius, location);
    res.send(patients);
  } catch (e) {
    next(e); 
  }
}

async function addPatient (req, res, next) {
  console.log('add patient');
  try {
    const patient = {...req.body};
    await savePatient(patient);
    res.send(patient);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  addPatient,
  getPatients,
};