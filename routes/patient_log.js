const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const LoginPost = require("../model/Patient_reg");
const { loginValidate } = require("../validation");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

router.post("/", async (req, res) => {
  //validating the data
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the name already exists
  const nameExist = await LoginPost.findOne({ name: req.body.name });
  if (!nameExist) return res.status(400).send("Name already exists");

  var password = req.body.password;
  const passwd = await LoginPost.findOne({ name: req.body.name });
  var pwd1 = passwd.password;

  //password checking
  try {
    const validPass = await bcrypt.compare(password, pwd1);
    if (!validPass) return res.status(400).send("Invalid password");
  } catch (err) {
    res.send(err);
  }

  //create and assign a token
  try {
    const token = jwt.sign({ _id: passwd._id }, process.env.TOKEN_SECRET);
    // console.log(token);
    res.header("auth-token", token).json({ messsage: "Successful" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
