const mongoose = require('mongoose');
const PatientSchema = require('./patient-schema');

const Patient = mongoose.model('Patient', PatientSchema);

const savePatient = function (patient) {
  const patientInfo = {...patient};
  patientInfo.unblockTime = Date.now() + 30 * 60 * 1000;
  const newPatient = new Patient(patientInfo);

  Patient.updateOne({ _id: patientInfo['_id'] }, newPatient,
    { upsert: true },
    (err, res) => {
      if (err) {
        console.log(err)
      }
    });
};

const isBlackListed = async function (patient) {
  return await new Promise((resolve) => {
    Patient.findById(
      patient['_id'],
      'unblockTime',
      (err, res) => {
        if (err) {
          resolve(undefined);
        } else {
          if (!res) {
            resolve(false)
          } else {
            resolve(res.unblockTime > Date.now());
          }
        }
      });
  });
};

const getPatientsByDistance = async function (radius, patientLocation) {
  return await new Promise((resolve) => {
    Patient.find(
      {
        location: {
          $geoWithin: {
            $center: [[patientLocation.longitude, patientLocation.latitude], radius]
          }
        }
      }, (err, res) => {
        if (err) {
          resolve(undefined);
        } else {
          resolve(res);
        }
      });
  });
};

module.exports = {
  savePatient,
  isBlackListed,
  getPatientsByDistance
};
