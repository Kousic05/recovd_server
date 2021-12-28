const { func } = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const Userpost = require("../model/Patient");
const upload = require("../upload_ware/upload");

router.get("/:name", async (req, res) => {
  try {
    const userpost = await Userpost.findOne({ name: `${req.params.name}` });

    if (userpost != null) {
      const updatepost = await Userpost.updateOne(
        { name: req.params.name },
        {
          $set: { age: req.body.age, gender: req.body.gender },
        }
      );
      res.json(updatepost);
      res.send(userpost);
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
