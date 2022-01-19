const express = require("express");
const router = express.Router();
const Patpost = require("../model/Patient");

router.get("/", async (req, res) => {
  try {
    const patpost = await Patpost.find();
    res.json(patpost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
