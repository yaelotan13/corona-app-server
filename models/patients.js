// const mongoose = require('mongoose');
// const PatientSchema = require('./patient-schema');
const getDb = require('../util/database').getDb;
const PATIENT_COLLECTION = 'patients';
//const Patient = mongoose.model('Patient', PatientSchema);

class Patient {
  constructor(patient) {
    this.id = patient._id;
    this.location = patient.location;
    this.status = patient.status;
    this.unblockTime = Date.now() + 30 * 60 * 1000;
  }

  save() {
    const db = getDb();
    return db.collection(PATIENT_COLLECTION)
      .insertOne(this)
      .then(result => {
      })
      .catch(error => {
        console.log(error);
      })
  }

  static getAllByReduis(patientLocation, radius) {
    const db = getDb();
    return db
    .collection(PATIENT_COLLECTION)
      .find({
        location: {
          $geoWithin: {
            $center: [[parseFloat(patientLocation.longitude), parseFloat(patientLocation.latitude)], parseFloat(radius)]
          }
        }
      })
      .toArray()
      .then(patients => {
        console.log(patients);
        return patients;
      })
      .catch(error => {
        console.log(error)
      })
  }

  static findById(patientId) {
    console.log('in modal findById');
    console.log(`userId is: ${patientId}`);
    const db = getDb();
    return db
    .collection(PATIENT_COLLECTION)
    .find({id: patientId})
    .next()
    .then(user => {
      console.log('in then()');
      console.log(user);
      return user;
    })
    .catch(error => {
      console.log(error);
    })
  }
}
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
  getPatientsByDistance,
  Patient
};
