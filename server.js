const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//To convert all to JSON format
app.use(express.json());

//DB connection
mongoose.connect(
  process.env.DB_connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log("Database error or database connection error " + error);
    } else {
      console.log("Database state is " + mongoose.connection.readyState);
      console.log("DB connected");
    }
  }
);

app.use("/uploads", express.static("uploads"));

//importing routes
const pat_regRoute = require("./routes/patient_reg");
app.use("/patient_reg", pat_regRoute);

const doct_regRoute = require("./routes/doctor_reg");
app.use("/doctor_reg", doct_regRoute);

const pat_logRoute = require("./routes/patient_log");
app.use("/patient_log", pat_logRoute);

const doct_logRoute = require("./routes/doctor_log");
app.use("/doctor_log", doct_logRoute);

const pat_usprofRoute = require("./routes/pat_userprof");
app.use("/pat_userprof", pat_usprofRoute);

const doc_usprofRoute = require("./routes/doc_userprof");
app.use("/doc_userprof", doc_usprofRoute);

const fileupload_Route = require("./routes/upload_file");
app.use("/upload_file", fileupload_Route);

const getAllDoc_Route = require("./routes/getAllDoc");
app.use("/getAllDoc", getAllDoc_Route);

const docAvatar_Route = require("./routes/docAvatar");
app.use("/docAvatar", docAvatar_Route);

//to listen to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Homepage of DB
app.get("/", (req, res) => {
  res.send("Welcome Home");
});
