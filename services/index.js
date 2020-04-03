const { savePatient, getPatientByDistance, isBlackListed } = require('../services/patients-service');

module.exports = {
  savePatient,
  getPatientByDistance,
  isBlackListed
};