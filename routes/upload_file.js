const express = require("express");
const router = express.Router();
const upload = require("../upload_ware/upload");
const userPost = require("../model/Patient");

router.post("/:name", upload.array("blood_test_result[]"), async (req, res) => {
  const userpost = await userPost.findOne({ name: `${req.params.name}` });
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    userpost.blood_test_result = path;
    const savedPost = await userpost.save();
    res.json(savedPost);
  }
});

module.exports = router;
