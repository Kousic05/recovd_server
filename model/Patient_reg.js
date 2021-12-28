const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    max: 9999999999,
    required: true,
  },
  blood_test_result: {
    type: String,
  },
});

module.exports = mongoose.model("patients", registerSchema);
