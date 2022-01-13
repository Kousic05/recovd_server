const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const client = require("socket.io").sockets;
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
  "mongodb+srv://inlustro_DB_user:kousic05@cluster0.iyf13.mongodb.net/inlustro_database?retryWrites=true&w=majority",
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

// //chat
// //Connect to Socket.io
// client.on("connection", function (socket) {
//   let chat = db.collection("chats");

//   //Create function to send status
//   sendStatus = function (s) {
//     socket.emit("status", s);
//   };

//   //Get chats from mongo collection
//   chat
//     .find()
//     .limit(100)
//     .sort({ _id: 1 })
//     .toArray(function (err, res) {
//       if (err) {
//         throw err;
//       }

//       //Emit the messages
//       socket.emit("output", res);
//     });

//   //Handle input events
//   socket.on("input", function (data) {
//     let name = data.name;
//     let message = data.message;

//     //Check for name and message
//     if (name == "" || message == "") {
//       //Send error status
//       sendStatus("Please enter a name and message");
//     } else {
//       //Insert message
//       chat.insert({ name: name, message: message }, function () {
//         client.emit("output", [data]);

//         //Send status object
//         sendStatus({
//           message: "Message sent",
//           clear: true,
//         });
//       });
//     }
//   });

//   //Handle clear
//   socket.on("clear", function (data) {
//     //Remove all chats from collection
//     chat.remove({}, function () {
//       //Emit cleared
//       socket.emit("cleared");
//     });
//   });
// });

//to listen to the server
app.listen(process.env.PORT || 5000);
