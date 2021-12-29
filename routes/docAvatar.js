const express = require("express");
const router = express.Router();
const upload = require("../upload_ware/upload");
const docPost = require("../model/Doctor");

router.post("/:name", upload.single("avatar"), async (req, res) => {
  const docpost = await docPost.findOne({ name: `${req.params.name}` });
  if (req.file) {
    docpost.avatar = req.file.path;
  }
  const savedPost = await docpost.save();
  res.json(savedPost);
});

module.exports = router;
