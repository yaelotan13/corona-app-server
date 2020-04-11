const getDb = require('../util/database').getDb;
const PATIENT_COLLECTION = 'patients';

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
    const db = getDb();
    return db
    .collection(PATIENT_COLLECTION)
    .find({id: patientId})
    .next()
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(error => {
      console.log(error);
    })
  }
}

module.exports = {
  Patient
};
