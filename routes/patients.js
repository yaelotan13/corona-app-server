const { addPatient, getPatients } = require('../controllers');
const { isBlackListed, decryption, validation } = require("../middleware");

module.exports = app => {
  app.route('/patients')
     .post(decryption, validation, isBlackListed, addPatient)
     .get(getPatients);
};