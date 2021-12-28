const mongoose = require("mongoose");

var patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  prescription: {
    type: String,
  },
  blood_test_result: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone_number: {
    type: Number,
    max: 9999999999,
  },
});

module.exports = mongoose.model("xyz", patientSchema, "patients");
