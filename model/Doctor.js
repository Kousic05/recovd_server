const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  position: {
    type: String,
  },
  gender: {
    type: String,
  },
  y_of_pract: {
    type: Number,
  },
  med_deg: {
    type: String,
  },
  wrk_place: {
    type: String,
  },
});

module.exports = mongoose.model("yzx", doctorSchema, "doctors");
