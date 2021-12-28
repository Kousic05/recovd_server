const express = require("express");
const router = express.Router();
const Userpost = require("../model/Doctor");

router.get("/:name", async (req, res) => {
  try {
    const username = req.params.name;
    // var uname = username.trim();
    const userpost = await Userpost.findOne({ name: username });
    if (userpost != null) {
      const updatepost = await Userpost.updateOne(
        { name: req.params.name },
        {
          $set: { age: req.body.age, gender: req.body.gender },
        }
      );
      res.json(updatepost);
      res.send(userpost);
      // console.log(userpost);
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

// `${req.params.name}`
