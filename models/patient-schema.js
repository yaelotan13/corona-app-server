const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  _id: String,
  location: {
    longitude: Number,
    latitude: Number
  },
  temperature: Number,
  cough: Number,
  shortnessOfBreath: Number,
  troubleBreathing: Number,
  painInChest: Number,
  confusion: Number,
  lossOfTaste: Number,
  lossOfSmell: Number,
  blueLips: Boolean,
  confirmedCorona: Boolean,
  status: String,
  unblockTime: Date
});

module.exports = PatientSchema;