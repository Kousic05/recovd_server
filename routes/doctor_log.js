const express = require("express");
const router = express.Router();
const LoginPost = require("../model/Doctor_reg");
const bcrypt = require("bcryptjs");
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

  //create and assign token
  try {
    const token = jwt.sign({ _id: passwd._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send("Successful");
  } catch (err) {
    res.send(err);
  }

  //password checking
  try {
    const validPass = await bcrypt.compare(password, pwd1);
    if (!validPass) return res.status(400).send("Invalid password");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
