const express = require("express");
const router = express.Router();
const Docpost = require("../model/Doctor");

router.get("/", async (req, res) => {
  try {
    const docpost = await Docpost.find();
    setTimeout(() => {
      res.json(docpost);
    }, 3000);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
