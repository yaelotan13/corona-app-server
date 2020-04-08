const modelPatient = require('../models/patients');

async function savePatient(patient) {
  //TODO check if patient is legit???
  console.log(patient);
  console.log(patient.location);
  const patientWithStatus = {
    ...patient,
    location: patient.location,
    status: getPatientStatus(patient),
  };

  const newPatient = new modelPatient.Patient(patientWithStatus);
  newPatient.save();
  //await modelPatient.savePatient(newPatient)
}

async function getPatientByDistance(radius, patientLocation) {
  return await modelPatient.Patient.getAllByReduis(patientLocation, radius);
}

async function isBlackListed(patient) {
  const user = await modelPatient.Patient.findById(patient._id);
  console.log('in service, user is: ');
  console.log(user);

  if (user) {
    return !unblockTimePasses(user)
  }

  return false;
}

function unblockTimePasses(user) {
  console.log(`user.unblockTim: ${user.unblockTime}`)
  console.log(`curr time: ${Date.now()}`);
  return user.unblockTime < Date.now();
}

function feverAndCough(patient) {
  if (patient.temperature < 42) {
    return patient.temperature >= 38 && patient.cough >= 3;
  } 

  return patient.temperature >= 98.6 && patient.cough >= 3;
}

function getPatientStatus(patient) {
  if (patient.confirmedCorona || patient.blueLips || feverAndCough(patient)) {
    return ('severe');
  }

  const temp = patient.temperature;
  const celsiusScore = temp < 37 ? 0 : temp > 37 && temp < 38 ? 4 : 10;
  const fahrenheitScore = temp < 98.6 ? 0 : temp > 98.6 && temp < 100.4 ? 4 : 10;
  const tempScore = temp < 42 ? celsiusScore : fahrenheitScore;
  const blueLipsScore = patient.blueLips ? 5 : 0;

  const symptomsAvg = 
  ((
    patient.cough +
    patient.shortnessOfBreath +
    patient.troubleBreathing +
    patient.painInChest +
    patient.confusion +
    patient.lossOfSmell +
    patient.lossOfTaste
  ) / 7) + tempScore + blueLipsScore;

  if (symptomsAvg < 5) {
    return ('healthy');
  }

  if (symptomsAvg <= 9) {
    return ('moderate');
  }

  return ('severe');
}

module.exports = {
  savePatient,
  getPatientByDistance,
  isBlackListed
};
