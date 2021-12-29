const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//To convert all to JSON format
app.use(express.json());
app.use(cors());

//Main Route
app.get("/", (req, res) => {
  res.send("Homepage");
});

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
// mongoose.connect(
//   process.env.DB_connection,
//   { retryWrites: true },
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
// mongoose.connection
//   .once("open", function () {
//     console.log("Conection has been made!");
//   })
//   .on("error", function (error) {
//     console.log("Error is: ", error);
//   });

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
app.listen(process.env.PORT || 5000);
