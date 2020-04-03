const modelPatient = require('../models/patients-model');

async function savePatient(patient) {
  //TODO check if patient is legit???
  const newPatient = {
    ...patient,
    status: getPatientStatus(patient),
  };

  await modelPatient.savePatient(newPatient)
}

async function getPatientByDistance(radius, patientLocation) {
  return await modelPatient.getPatientsByDistance(radius, patientLocation);
}

async function isBlackListed(patient) {
  return await modelPatient.isBlackListed(patient);
}

function getPatientStatus(patient) {
  if (patient.confirmedCorona || patient.blueLips) {
    return ('severe');
  }

  let symptomsAvg = (((patient.temperature) * 10 / 40) +
    patient.cough +
    patient.shortnessOfBreath +
    patient.troubleBreathing +
    patient.painInChest +
    patient.confusion +
    patient.lossOfSmell +
    patient.lossOfTaste) / 8;
  if (symptomsAvg <= 1) {
    return ('healthy');
  }

  if (symptomsAvg <= 5) {
    return ('moderate');
  }

  return ('severe');
}

module.exports = {
  savePatient,
  getPatientByDistance,
  isBlackListed
};
