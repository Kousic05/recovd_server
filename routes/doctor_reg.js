const express = require("express");
const router = express.Router();
const RegisterPost = require("../model/Doctor_reg");
const bcrypt = require("bcryptjs");
const { registerValidate } = require("../validation");

router.post("/", async (req, res) => {
  //validating the data
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check whether the name already exists
  const nameExist = await RegisterPost.findOne({ name: req.body.name });
  if (nameExist) return res.status(400).send("Name already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //creating data in DB
  const reg = new RegisterPost({
    name: req.body.name,
    password: hashPassword,
    phone_number: req.body.phone_number,
  });

  //saving it in DB
  try {
    const savedPost = await reg.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
